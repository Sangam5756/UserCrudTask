import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditModel from "../components/EditModel";
import CreateModal from "../components/CreateModal";
import DeleteModal from "../components/DeleteModal";
import { useDispatch } from "react-redux";
import { setUser, AddnewUser } from "../redux/userSlice";
import Shimmer from "../components/shimmer/Shimmer";
import { toast } from "react-toastify";

const Home = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Editing the data
  const [openmodal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Creating the data
  const [openCreatemodal, setOpenCreateModal] = useState(false);

  //deleting the modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      dispatch(setUser(response.data));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // edit data
  const handleUpdateUser = async (updatedUser) => {
    try {
      // Update the user in the array
      setLoading(true);
      const data = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );

      const updatedUsers = users?.map((u) =>
        u?.id === data?.data?.id ? data?.data : u
      );

      setUsers(updatedUsers);

      setLoading(false);
      dispatch(setUser(updatedUser));
      toast.success("User Updated Successfully");
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOnclickUser = (user) => {
    setOpenModal(!openmodal);
    setSelectedUser(user);
  };

  // new data
  const handleNewUser = async (newUser) => {
    try {
      setLoading(true);
      const newId =
        users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

      const userWithId = {
        ...newUser,
        id: newId, // Manually set the new id
      };
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        userWithId
      );

      setUsers([response.data, ...users]);
      setLoading(false);
      dispatch(AddnewUser([response.data, ...users]));
      toast.success("New User added Successfully");
    } catch (error) {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      setDeleteId(id);
      setDeleteModal(!deleteModal);
    } catch (error) {
    }
  };

  const deleteUSerConfirmed = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        "https://jsonplaceholder.typicode.com/users/" + deleteId
      );
      setUsers(users.filter((user) => user.id !== deleteId));
      setLoading(false);
      setDeleteModal(false);
      dispatch(setUsers(users.filter((user) => user.id !== deleteId)));
      toast.success("User deleted Successfully");
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Show loading text while fetching users
  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mt-10 text-center">User Management</h1>
      <button
        className="bg-purple-400 max-w-fit ml-auto w-fit flex text-white py-1 px-2 rounded transition duration-150 hover:bg-red-700"
        title="create user"
        onClick={() => setOpenCreateModal(!openCreatemodal)}
      >
        Create
      </button>
      {/* User Table */}
      <div className="overflow-x-auto text-white rounded-md">
        <table className="min-w-full text-wrap border border-gray-300 shadow-md rounded-md">
          <thead className="custom-gray text-white">
            <tr>
              <th className="py-3 px-4 border-b text-left  font-semibold">
                ID
              </th>
              <th className="py-3 px-4 border-b text-left  font-semibold">
                Name
              </th>
              <th className="py-3 px-4 border-b text-left  font-semibold">
                Email
              </th>
              <th className="py-3 px-4 border-b text-left  font-semibold">
                Username
              </th>
              <th className="py-3 px-4 border-b text-left  font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`transition duration-150 ${
                  index % 2 === 0 ? "bg-green-500" : "custom-gray "
                } hover:bg-gray-100 hover:text-black`}
              >
                <td className="py-2 px-4 border-b">{user?.id}</td>
                <td className="py-2 px-4 border-b">{user?.name}</td>
                <td className="py-2 px-4 border-b">{user?.email}</td>
                <td className="py-2 px-4 border-b">{user?.username}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-3 sm:gap-1">
                    <Link
                      title="view all details"
                      to={`/user/${user.id}`}
                      className="bg-blue-600 text-white py-1 px-2 rounded transition duration-150 hover:bg-green-700"
                    >
                      View
                    </Link>
                    <button
                      className="bg-blue-600 text-white py-1 px-2 rounded transition duration-150 hover:bg-slate-700"
                      onClick={() => {
                        handleOnclickUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white py-1 px-2 rounded transition duration-150 hover:bg-red-700"
                      title="delete user"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openmodal && (
        <EditModel
          user={[selectedUser]}
          setUserById={handleUpdateUser}
          onClose={() => setOpenModal(false)}
        />
      )}

      {openCreatemodal && (
        <CreateModal
          setUserById={handleNewUser}
          onClose={() => setOpenCreateModal(false)}
        />
      )}

      {deleteModal && (
        <DeleteModal
          deleteUSerConfirmed={deleteUSerConfirmed}
          onClose={() => setDeleteModal(!deleteModal)}
        />
      )}
    </div>
  );
};

export default Home;
