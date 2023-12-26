import { Route, Routes } from 'react-router-dom';
import UserTemplate from './templates/userTemplate/UserTemplate';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/LoginPage/Login';
function App() {
  return (
    <>
      {/* react router dom */}
      <Routes>
        {/* Route cha chứa các route con */}
        <Route element={<UserTemplate/>} path='/'>
          {/* các route con hiển thị dựa trên vị trí của các Outlet */}
          <Route element={<HomePage/>} index/>
        </Route>
          <Route element={<Login/>} path='/login'/>
      </Routes>
    </>
  );
}

export default App;
