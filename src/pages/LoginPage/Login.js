import React from "react";
import * as loginAnimation from "./../../assets/animation/loginAnimation.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userServ } from "../../services/userServ";
import { message } from "antd";
import { saveLocal } from "../../util/local";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveInforUser } from "../../redux/slice/userSlice";

const Login = () => {
  // use Dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  // ant
  const [messageApi, contextHolder] = message.useMessage();

  // formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: (values) => {
        console.log(values);
        userServ
          .loginServ(values)
          .then((result) => {
            console.log(result);
            // thông báo thành công
            messageApi.open({
              type: "success",
              content: "Đăng nhập thành công",
            });
            // lưu thông tin người dùng
            saveLocal(result.data.content, "user_infor");
            dispatch(saveInforUser(result.data.content));
            // chuyển đến trang chủ
            setTimeout(() => {
              navigate("/");
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            messageApi.open({
              type: "error",
              content: err.response.data.content,
            });
          });
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
        matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  // animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {contextHolder}
      <div className="h-screen flex items-center justify-center">
        <div className="container">
          <div className="grid grid-cols-2">
            <div className="col_left py-">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
            <div className="col_right">
              <form
                className="max-w-sm mx-auto space-y-5"
                onSubmit={handleSubmit}
              >
                <h2 className="font-bold mb-5 text-3xl text-blue-400">
                  Đăng nhập movie
                </h2>
                <div className="mb-5">
                  <label
                    htmlFor="taiKhoan"
                    className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
                  >
                    Tài khoản
                  </label>
                  <input
                    type="text"
                    id="taiKhoan"
                    name="taiKhoan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Vui lòng nhập tài khoản..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.taiKhoan}
                  />
                  {errors.taiKhoan && touched.taiKhoan ? (
                    <p className="text-red-500 mt-1">{errors.taiKhoan}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="matKhau"
                    className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="matKhau"
                    name="matKhau"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
                    placeholder="Vui lòng nhập mật khẩu..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.matKhau}
                  />
                  {errors.matKhau && touched.matKhau ? (
                    <p className="text-red-500 mt-1">{errors.matKhau}</p>
                  ) : (
                    ""
                  )}
                </div>
               
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Đăng nhập
                </button>
                <p className="text-sm text-blue-400 pb-5">Nếu chưa có tài khoản vui lòng đăng ký</p> 
                <NavLink  className={({isActive, isPending, isTransitioning }) => {
              return isTransitioning
                ? "text-red-500 text-sm font-semibold leading-6"
                : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
            }} to={"/register"} >Đăng ký</NavLink>
              </form>
                
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
