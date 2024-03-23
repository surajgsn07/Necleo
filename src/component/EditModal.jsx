import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteVerificationModal from "./DeleteVerificationModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../store/projectsSplice";
import { toggle } from "../store/reload.slice";

const EditModal = ({ isOpen, onClose, edit, project }) => {
  const [title, setTitle] = useState(project.title);
  const [subtitle, setSubtitle] = useState(project.subtitle);
  const [description, setDescription] = useState(project.description);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.projects);

  const updateLocalStorage = () => {
    localStorage.setItem("projectArray", JSON.stringify(projects));
  };

  const handleOpenModal = () => {
    setopen(true);
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setopen(false);
  };

  const handleConfirmDelete = (event) => {
    // Logic to delete the item
    event.stopPropagation();
    dispatch(deleteProject({ project }));

    updateLocalStorage();
    setopen(false);
    onClose();
  };

  const handleCreate = () => {
    if (!(title != "" && subtitle != "" && description != "")) {
      alert("All fields are required");
      return;
    }
    const id = project.id;
    edit({ title, subtitle, description, id });
    onClose();
  };

  return (
    <div
      className={`modal ${isOpen ? "block" : "hidden"} absolute top-3 w-full `}
    >
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg  overflow-y-auto z-30 ">
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M6.364 9l-5.257 5.257a1 1 0 101.414 1.414L9 10.414l5.243 5.243a1 1 0 101.414-1.414L10.414 9l5.257-5.257a1 1 0 10-1.414-1.414L9 7.586 3.757 2.343a1 1 0 10-1.414 1.414L7.586 9l-5.25 5.25a1 1 0 001.414 1.414L9 10.414l5.25 5.25a1 1 0 001.414-1.414L10.414 9z"></path>
          </svg>
        </div>

        <div className="modal-content py-4 text-left px-6 z-30">
          <div className="w-full flex justify-end text-black text-2xl">
            <div onClick={handleOpenModal}>
              <MdDelete />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subtitle"
            >
              Subtitle
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subtitle"
              type="text"
              placeholder="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCreate}
            >
              Update
            </button>
            <button
              className="modal-close bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <DeleteVerificationModal
        isOpen={open}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EditModal;
