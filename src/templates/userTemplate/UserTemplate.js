import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingAnimation from "../../components/loading/LoadingAnimation";

const UserTemplate = () => {
  const { isActive } = useSelector((state) => state.loadingSlice);
  return (
    <>
      {isActive ? <LoadingAnimation /> : null}
      {/* <LoadingAnimation/> */}
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
    </>
  );
};

export default UserTemplate;
