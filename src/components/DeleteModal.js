import React from "react";

const DeleteModal = ({ onClose, deleteUSerConfirmed }) => {
  return (
    <div className="fixed flex items-center w-full  left-0 right-0 bottom-0 top-0 px-10  lg:mt-auto justify-center ">
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 ">DELETE</h2>
        <h2 className="font-bold ">Confirm Delete</h2>
        <p>Are you sure you want to delete this user?</p>
        <button
          className="px-5 mt-2 py-1 bg-slate-300 rounded-md hover:bg-slate-400 mx-2 "
          onClick={deleteUSerConfirmed}
        >
          Delete
        </button>
        <button
          className="px-5 mt-2 py-1 bg-slate-300 rounded-md hover:bg-slate-400 "
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
