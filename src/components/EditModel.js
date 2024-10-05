import axios from "axios";
import React, { useState } from "react";

const EditModel = ({ user, onClose ,setUserById}) => {
  const [formData, setFormData] = useState(user[0]);
  console.log(user);
  console.log(user)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "street" || name === "city") {
      setFormData((prevUser) => ({
        ...prevUser,
        address: { ...prevUser.address, [name]: value },
      }));
    } else if (name === "company") {
      setFormData((prevUser) => ({
        ...prevUser,
        company: { name: value },
      }));
    } else {
      setFormData((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your update logic here (e.g., API call)
    // const data = await axios.put(
    //   "https://jsonplaceholder.typicode.com/users/" + formData.id,
    //   formData
    // );
    // console.log("updated data", data?.data);
    // if (user?.id === data?.data?.id) {
    //   setFormData(data?.data);
    // }
    // console.log(formData);
    setUserById(formData);

    // console.log("Updated User Data:", formData);

    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed flex items-center w-full top-0 mt-10 lg:mt-auto justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="grid ">
          <label htmlFor="name">name</label>
          <input
            value={formData?.name}
            type="text"
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="name"
            id="name"
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            value={formData?.email}
            type="text"
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="email"
            id="email"
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            value={formData?.phone}
            type="text"
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="phone"
            id="phone"
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
          <input
            defaultValue={formData?.username}
            type="text"
            name="username"
            id="username"
            readOnly
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
          />
          <label htmlFor="street">Street</label>
          <input
            value={formData?.address?.street}
            type="text"
            required
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="street"
            id="street"
            onChange={handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            value={formData?.address?.city}
            type="text"
            required
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="city"
            id="city"
            onChange={handleChange}
          />

          <label htmlFor="company">Company</label>
          <input
            value={formData?.company?.name}
            type="text"
            name="company"
            required
            id="company"
            onChange={handleChange}
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
          />

          <label htmlFor="website">Website</label>
          <input
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            value={formData?.website}
            type="text"
            name="website"
            required
            id="website"
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <button className="px-2 py-1 bg-slate-400" type="submit">
              Edit
            </button>
            <button onClick={onClose} className="px-2 py-1 bg-slate-400">
              close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
