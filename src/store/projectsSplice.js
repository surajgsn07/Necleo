import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
}

export const projectsSlice = createSlice({
  name: 'projectsSlice',
  initialState,
  reducers: {
    addProject: (state , action) => {
        const {title, subtitle, description , id } = action.payload; // Destructure the fields from the payload
        const project = { id, title, subtitle, description }; // Define the project object
        state.projects.push(project);
    },
    deleteProject :(state , action) =>{
        const {project} = action.payload;
        state.projects = state.projects.filter(obj => obj.id !== project.id);
    },
    editProject :(state ,action)=>{
        const {title, subtitle, description , id} = action.payload;
        state.projects.forEach(obj =>{
            if(obj.id == id){
                obj.title = title,
                obj.subtitle = subtitle,
                obj.description = description
            }
        })
    }
  },
})

export const { addProject, deleteProject ,editProject } = projectsSlice.actions

export default projectsSlice.reducer