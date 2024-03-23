import React, { useEffect, useState } from "react";
import ProjectModal from "./ProjectModal";

const Card = ({ src, title, subtitle , description ,id }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const onClose = (event)=>{
    setIsModalOpen(false);
  }


  useEffect(() => {
    
  }, [])
  
  return (
    <div className="w-[280px]   p-4 h-[200px]" onClick={()=> { title ? setIsModalOpen(true) : null }} >
      <div className="w-full overflow-hidden rounded-lg h-[80%]  ">
        <img src={src} alt="" />
        {" "}
        {src ? (
          <img className="object-cover w-full h-full" src={src} alt="" />
        ) : (
          <div className=" flex items-center justify-center overflow-hidden bg-[#fcc8ac] h-full w-full">
            {" "}
            <img
              className="object-cover w-[110px]"
              src="plus.png"
              alt=""
            />{" "}
          </div>
        )}
      </div>
      <div>
        <div id="title" className="w-full flex justify-center font-bold">
          {title ? <div> {title}</div> : <div>Create a new project</div>}
        </div>
        <div
          id="subtitle"
          className="w-full flex justify-center font-bold text-[13px]"
        >
          {subtitle ? (
            <div>{subtitle}</div>
          ) : (
            <div>
              or try a <span className="text-[#fa782f]">sample project</span>
            </div>
          )}
        </div>
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={onClose} project={{title , subtitle , description,id , src}} />
    </div>
  );
};

export default Card;
