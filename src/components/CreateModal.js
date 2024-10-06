import React, { useState } from "react";
import { validateForm } from "../helper/Validation";
import { toast } from "react-toastify";

const CreateModal = ({ onClose, setUserById }) => {
  const [formData, setFormData] = useState();

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
    console.log("clicked")
    const error = validateForm(formData);
    if (error) {
      toast.error(
        error?.name ||
          error?.phone ||
          error?.website ||
          error?.email ||
          error?.street ||
          error?.city ||
          error?.username ||
          error?.company
      );
    }

    
    if (Object.keys(error).length === 0) {
      setUserById(formData);
      onClose();
    }
  };

  return (
    <div className="fixed flex items-center w-full right-0 bottom-0 left-0 bg-slate-200 px-5 bg-opacity-50 top-0 mt-10 lg:mt-auto justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">New User</h2>
        <form onSubmit={handleSubmit} className="grid">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="name"
            id="name"
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="email"
            id="email"
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="phone"
            id="phone"
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
          />
          <label htmlFor="street">Street</label>
          <input
            type="text"
            required
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="street"
            id="street"
            onChange={handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            required
            className="bg-slate-200 rounded-md px-2 mb-2 outline-none"
            name="city"
            id="city"
            onChange={handleChange}
          />

          <label htmlFor="company">Company</label>
          <input
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
            type="text"
            name="website"
            id="website"
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <button className="px-2 py-1 bg-slate-400 rounded-md" type="submit">
              Create new User
            </button>
            <button
              onClick={onClose}
              className="px-2 rounded-md py-1 bg-slate-400"
            >
              close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
