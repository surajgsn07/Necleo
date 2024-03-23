import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";
import { RiAppsFill } from "react-icons/ri";
import { TbApps } from "react-icons/tb";
import { IoIosPlayCircle } from "react-icons/io";
import { HiOutlineViewList } from "react-icons/hi";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import Card from "./component/Card";
import { IoMdHelpCircle } from "react-icons/io";
import { RiFeedbackFill } from "react-icons/ri";
import { BiSolidLogOut } from "react-icons/bi";
import Modal from "./component/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "./store/projectsSplice";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [images, setimages] = useState([])
  const dispatch = useDispatch()
  const projects = useSelector((state)=>state.project.projects)

  const updateLocalStorage = ()=>{
    localStorage.setItem('projectArray',JSON.stringify(projects));
  }

  const fetchApi = async()=>{
    try {
      const data = await fetch(`https://picsum.photos/v2/list?page=1&limit=${projects.length || 0}`)
      const images = await data.json();
      if(projects.length > 0){
        setimages(images)
      }
    } catch (error) {
      alert(error)
    }
  }


  
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleCreateProject = (projectData) => {
    // Logic to handle project creation goes here
    dispatch(addProject(projectData));
    // updateLocalStorage()
  };


  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if(projects.length === 0){
      if(localStorage.getItem('projectArray')){
        const array = localStorage.getItem('projectArray');
        if(array){
          const projects = JSON.parse(array);
          projects.forEach(function(element, index) {
            dispatch(addProject(element))
          });
        }
  
      }
    }

    
    fetchApi()

    if(windowWidth > 640){
      setIsOpen(true)
    }

    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  useEffect(() => {
    updateLocalStorage()
    fetchApi(); // Call fetchApi whenever projects change
  }, [projects]);

  return (
    <>
      <div id="navbar" className="flex  justify-end p-0 m-0 relative w-full">
        <div
          className={`flex text-3xl  justify-center items-center ${!isOpen ? "block":"hidden"} absolute top-3 left-3`}
          onClick={toggleSidebar}
        >
          <HiOutlineViewList />
        </div>
        <div className="flex">
          <div>
            <div className="flex item-center gap-2">
              <div className="font-bold">Free trial |</div>
              <div className="text-sm flex items-center">2 days left</div>
            </div>
            <div className="text-sm font-semibold text-[#fa782f] flex justify-start">
              Extend free trial
            </div>
          </div>
          <div className="h-full m-2 flex">
            <div className="w-[35px]  ">
              <img className="object-cover w-full" src="image.png" alt="" />
            </div>
            <div className="text-3xl pt-1">
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
      </div>
      <div id="body" className="w-full min-h-screen flex bg-[#f9f8f9]">
        {(isOpen) && (
          <div
            id="sidebar"
            className={` ${
              windowWidth < 640 ? "absolute top-0 left-0" : "" // Apply absolute positioning conditionally
            } flex  flex-col justify-between bg-white  w-[320px] h-screen border-[1px] transition-transform transform ${
              isOpen || windowWidth > 640
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
          >
            <div className="w-full">
              <div className="w-full  items-center justify-center border-[1px]">
                {" "}
                <div className="overflow-hidden w-[160px] mx-auto my-[20px]">
                  <img className="object-cover w-full" src="logo.png" alt="" />
                </div>
              </div>
              <div className="text-gray-400 font-bold flex flex-col items-center text-lg ">
                <div className="flex flex-col gap-5 p-5 " >
                  <div className="flex  items-center gap-3 text-orange-400 ">
                    {" "}
                    <FaDatabase />
                    My Projects
                  </div>
                  <div className="flex items-center gap-3 ">
                    <div className="text-3xl">
                      <RiAppsFill />
                    </div>
                    Sample Projects
                  </div>

                  <div className="border-t-[3px]"></div>

                  <div className="flex items-center gap-3 ">
                    <div className="text-3xl">
                      <TbApps />
                    </div>
                    Apps
                  </div>
                  <div className="flex  items-center gap-3 ">
                    {" "}
                    <div className="text-3xl">
                      <IoIosPlayCircle />
                    </div>
                    Intro to Necleo
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="text-gray-400 font-bold flex flex-col items-center text-lg ">
                <div className="flex flex-col gap-5 p-5">
                <div className="flex  items-center gap-3 ">
                    {" "}
                    <div className="text-3xl">
                    <IoMdHelpCircle />
                    </div>
                    Help and Support
                  </div>
                  <div className="flex  items-center gap-3 ">
                    {" "}
                    <div className="text-3xl">
                    <RiFeedbackFill />
                    </div>
                    Feedback
                  </div>
                  <div className="flex  items-center gap-3  text-black" onClick={toggleSidebar}>
                    {" "}
                    <div className="text-3xl">
                    <BiSolidLogOut />
                    </div>
                    Collapse
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        <div id="content" className="bg-[#f9f8f9] w-full">
          <div className="w-full font-bold text-3xl tracking-wide px-8 py-4 ">
            {" "}
            My Projects
          </div>
          <div id="createCard" className="w-full" onClick={()=>setIsModalOpen(true)} >
            <Card />
          </div>
          <div id="myProjects" className="flex gap-3 flex-wrap">

            {projects.map((project , index) => (
              <Card title={project.title} description={project.description} id={project.id} subtitle={project.subtitle} src={images[index]?.download_url} key={index}  />
            ))}

          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
}



export default App;
