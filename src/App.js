import { Route, Routes } from "react-router-dom";
import UserTemplate from "./templates/userTemplate/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/Login";
import AdminTemplate from "./templates/adminTemplate/AdminTemplate";
import MovieManager from "./pages/MovieManager/MovieManager";
import UserManager from "./pages/UserManager/UserManager";
import OrderManager from "./pages/OrderManager/OrderManager";
import AddMovie from "./pages/AddMovie/AddMovie";
import Register from "./pages/Register/Register";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
function App() {
  return (
    <>
      {/* react router dom */}
      <Routes>
        {/* Route cha chứa các route con */}
        <Route element={<UserTemplate />} path="/">
          {/* các route con hiển thị dựa trên vị trí của các Outlet */}
          <Route element={<HomePage />} index />
          {/* chi tiet phim */}
          <Route element={<DetailFilm/>} path="detail/:maPhim"/>
        </Route>
        <Route element={<AdminTemplate />} path="/admin">
          <Route element={<MovieManager />} index />
          <Route element={<AddMovie/>} path="add-movie"/>
          <Route element={<UserManager/>} path="manager-user"/>
          <Route element={<OrderManager/>} path="manager-order"/>
        </Route>
        {/* chức năng đăng nhập: dùng formik+yup để lấy thông tin đăng nhập, tạo userServ để gọi API POST, dùng ant để 
hiển tị thông báo đăng nhập thành coongm thất bại, đăng nhập thành công thì chuyển hướng đến trang chủ bằng navigate, dùng local storage để lưu thông tin người dùng, và hiển thị tên người dùng lên nút login, dùng useDispatch để bắn dữ liệu người dúng đăng nhập lên store,.. */}
        <Route element={<Login />} path="/login" />
        <Route element={<Register/>}  path="/register"/>
        {/* page 404 */}

      </Routes>
    </>
  );
}

export default App;

