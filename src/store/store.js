import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './projectsSplice'
import reloadReducer from './reload.slice'
export const store = configureStore({
  reducer: {
    project:projectReducer,
    reload : reloadReducer

  },
})