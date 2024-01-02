import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyFilmServ } from '../../services/quanLyFilmServ'


export const getAllMovieThunk = createAsyncThunk(
    'movie/getAllMovieThunk',
    async (data, thunkAPI) => {
        // data được dùng như lấy chi tiết movie(id), hoặc data them mới giống như action
        console.log(data);
        //gọi dữ liệu từ sever để lấy data
        const res = await quanLyFilmServ.getAllFilm();
        return res.data.content
      }
)
const initialState = {
    // tạo list movie chứa danh sách phim
    listMovie: [],
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    // fulfilled là trạng thái của thunk khi lấy dữ liệu thành công
    builder.addCase(getAllMovieThunk.fulfilled, (state, action)=>{
        console.log(state);
        // nhận về dữ liệu được trả về bên trên res.data.content
        console.log(action);
        state.listMovie = action.payload;
    })
  }
});

export const {} = movieSlice.actions

export default movieSlice.reducer