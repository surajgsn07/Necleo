import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import { useDispatch } from "react-redux";
import { editProject } from "../store/projectsSplice";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const dispatch = useDispatch();

  const open = () => {
    setisModalOpen(true);
  };

  const close = (event) => {
    setisModalOpen(false);
    onClose();
  };

  const edit = (data) => {
    dispatch(
      editProject({
        title: data.title,
        description: data.description,
        subtitle: data.subtitle,
        id: project.id,
      })
    );
  };

  useEffect(() => {}, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 max-w-md mx-auto rounded-lg">
        <div className="flex justify-between ">
          <div onClick={open}>
            <button className=" border-[1px] border-black rounded-lg px-4 py-2 mb-3 ">
              Edit
            </button>
          </div>
          <div onClick={(event)=>{
            event.stopPropagation()
            onClose()}}>
            <button className=" border-[1px] border-black rounded-lg px-4 py-2 mb-3 ">
              Close
            </button>
          </div>
        </div>
        <img
          src={project.src}
          alt={project.title}
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{project.title}</h2>
        <h3 className="text-lg font-semibold mb-2">{project.subtitle}</h3>
        <p className="text-gray-700">{project.description}</p>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={close}
        edit={edit}
        project={project}
      />
    </div>
  );
};

export default ProjectModal;
