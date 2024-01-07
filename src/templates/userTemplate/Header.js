import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
const Header = () => {
  const {user} = useSelector((state)=>{
   return state.userSlice
  })
  // console.log(user);
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-red-500 text-sm font-semibold leading-6"
                : "text-sm font-semibold leading-6 text-gray-900";
            }}
          >
            Lịch chiếu
          </NavLink>
          <NavLink
            to={"/cum-rap"}
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-red-500 text-sm font-semibold leading-6"
                : "text-sm font-semibold leading-6 text-gray-900";
            }}
          >
            Cụm rạp
          </NavLink>
          <NavLink
            to={"/tin-tuc"}
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-red-500 text-sm font-semibold leading-6"
                : "text-sm font-semibold leading-6 text-gray-900";
            }}
          >
            Tin tức
          </NavLink>
          <NavLink
            to={"/ung-dung"}
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-red-500 text-sm font-semibold leading-6"
                : "text-sm font-semibold leading-6 text-gray-900";
            }}
          >
            Ứng dụng
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">→</span>
          </a> */}
             {user ? (<div className="flex items-center justify-center"><p className="text-blue-400 text-sm mr-3">{user.hoTen}</p> <NavLink
            to={"/login"}
            className="text-sm font-semibold leading-6 text-gray-900">
            {/* nếu chưa đăng nhập hiển thị login, đăng nhập rồi hiên thi ten nguoi dung */}
            Logout
          </NavLink></div> ) : (<NavLink
            to={"/login"}
            className="text-sm font-semibold leading-6 text-gray-900">
            {/* nếu chưa đăng nhập hiển thị login, đăng nhập rồi hiên thi ten nguoi dung */}
            Login
          </NavLink>)}
             
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      
    </header>
  );
};

export default Header;
