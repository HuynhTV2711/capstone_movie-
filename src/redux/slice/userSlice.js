import { createSlice } from '@reduxjs/toolkit'
import { getLocal } from '../../util/local';

const initialState = {
    user: getLocal("user_infor")
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {saveInforUser: (state, action)=>{
    state.user = action.payload
  }}
});

export const {saveInforUser} = userSlice.actions

export default userSlice.reducer