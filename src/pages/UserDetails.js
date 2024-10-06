import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Shimmer from "../components/shimmer/Shimmer";

const UserDetail = () => {
  const { id } = useParams();

  const userR = useSelector((store) => store?.user?.user);

  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = userR.filter((user) => user?.id === Number(id));
      setUsers(data[0]);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  if (loading) return <Shimmer />;

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg sm:max-w-xl md:max-w-2xl mt-2 lg:mt-10">
        <Link title="Go to Home page" to={"/"}>
          Back
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">User Detail</h1>
        <p className="text-gray-600 mb-4 text-center">
          Details for user with ID: <strong>{id}</strong>
        </p>

        {user && (
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-xl font-semibold">User Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "N/A"}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Street:</strong> {user.address?.street || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {user.address?.city || "N/A"}
              </p>
              <p>
                <strong>Company:</strong> {user.company?.name || "N/A"}
              </p>
              <p>
                <strong>Website:</strong> {user.website || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default UserDetail;
