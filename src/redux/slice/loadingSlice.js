import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActive : false,
    count: 0
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action)=>{
        state.isActive = true;
        state.count++
    },
    endLoading: (state, action)=>{
      state.count--;
      if (state.count == 0) {
        state.isActive = false
      }
    }
  }
});

export const {startLoading, endLoading} = loadingSlice.actions

export default loadingSlice.reducer