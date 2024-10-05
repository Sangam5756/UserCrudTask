import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditModel from "../components/EditModel";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    // Update the user in the array
    const updatedUsers = users?.map((u) =>
      u?.id === updatedUser?.id ? updatedUser : u
    );
    setUsers(updatedUsers); // Update the state with the modified users list
  };

  useEffect(() => {
    fetchUsers();

    if (editUserId) {
      const userById = users?.find((user) => user.id === editUserId);
      setSelectedUser(userById || null); // Set selected user based on ID
    }
  
  }, [editUserId]);

  // Show loading text while fetching users
  if (loading) {
    return <p>Loading users...</p>;
  }

  console.log("rerender")

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* User Table */}
      <div className="overflow-x-auto text-white">
        <table className="min-w-full text-wrap border border-gray-300 shadow-md rounded-lg">
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
                      // onClick={() => handleUserClick(user)}
                      className="bg-blue-600 text-white py-1 px-2 rounded transition duration-150 hover:bg-green-700"
                      aria-label={`View ${user.name}`}
                    >
                      View
                    </Link>
                    <button
                      onClick={() => {
                        setOpenModal(!openmodal);
                        setEditUserId(user?.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      // onClick={() => openDeleteModal(user.id)}
                      className="bg-red-600 text-white py-1 px-2 rounded transition duration-150 hover:bg-red-700"
                      aria-label={`Delete ${user?.name}`}
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
    </div>
  );
};

export default Home;
