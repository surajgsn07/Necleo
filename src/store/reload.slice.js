import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reload: true,
}

export const reloadSlice = createSlice({
  name: 'reloadSlice',
  initialState,
  reducers: {
    toggle: (state , action) => {
        state.reload = !state.reload
    },
  },
})

export const { toggle } = reloadSlice.actions

export default reloadSlice.reducer