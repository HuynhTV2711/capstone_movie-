import React from "react";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import { userServ } from "../../services/userServ";
import { message } from "antd";
import { validationRegister } from "../../util/validation";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
    // ant
  const [messageApi, contextHolder] = message.useMessage();
  // navigate
  const navigate = useNavigate();
  // formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "",
        hoTen: "",
      },
      onSubmit: (values) => {
        console.log(values);
        userServ.registerServ(values)
        .then((result) => {
             // thông báo thành công
          messageApi.open({
            type: 'success',
            content: 'Đăng ký thành công',
          });
          // chuyển đến trang đăng nhập
          setTimeout(() => {
            navigate("/login")
          }, 2000);
        }).catch((err) => {
            messageApi.open({
                type: 'error',
                content: err.response.data.content,
              });
        });
      },
      validationSchema: validationRegister
    });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
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
          <div className="col_left">
            <form
              className="max-w-sm mx-auto space-y-3"
              onSubmit={handleSubmit}
            >
              <h2 className="font-bold mb-5 text-3xl text-blue-400">
                Đăng ký tài khoản
              </h2>
              {/* Tài khoản */}
              <div>
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
              {/* Mật khẩu */}
              <div>
                <label
                  htmlFor="matKhau"
                  className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
                >
                  Mật khẩu
                </label>
                <input
                  type="text"
                  id="matKhau"
                  name="matKhau"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập tài khoản..."
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
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập tài khoản..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-500 mt-1">{errors.email}</p>
                ) : (
                  ""
                )}
              </div>
              {/* Số điện thoại */}
              <div>
                <label
                  htmlFor="soDt"
                  className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="soDt"
                  name="soDt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập tài khoản..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.soDt}
                />
                {errors.soDt && touched.soDt ? (
                  <p className="text-red-500 mt-1">{errors.soDt}</p>
                ) : (
                  ""
                )}
              </div>
              {/* Mã nhóm */}
              <div>
                {/* Mã nhóm */}
                <div>
                  <label
                    htmlFor="maNhom"
                    className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
                  >
                    Mã nhóm
                  </label>
                  <select
                    id="maNhom"
                    name="maNhom"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maNhom}
                  >
                    <option value="">Chọn mã nhóm</option>
                    <option value="GP01">GP01</option>
                    <option value="GP02">GP02</option>
                    <option value="GP03">GP03</option>
                    <option value="GP04">GP04</option>
                    <option value="GP05">GP05</option>
                    <option value="GP06">GP06</option>
                    <option value="GP07">GP07</option>
                    <option value="GP08">GP08</option>
                    <option value="GP09">GP09</option>
                  </select>

                  {errors.maNhom && touched.maNhom ? (
                    <p className="text-red-500 mt-1">{errors.maNhom}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* Họ tên */}
              <div>
                <label
                  htmlFor="hoTen"
                  className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  id="hoTen"
                  name="hoTen"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập tài khoản..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hoTen}
                />
                {errors.hoTen && touched.hoTen ? (
                  <p className="text-red-500 mt-1">{errors.hoTen}</p>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5"
              >
                Đăng ký
              </button>
              <p className="text-sm text-blue-400 pb-5">Nếu đã chưa có tài khoản vui lòng đăng nhập</p> 
              <NavLink  className={({isActive, isPending, isTransitioning }) => {
              return isTransitioning
                ? "text-red-500 text-sm font-semibold leading-6"
                : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
            }} to={"/login"} >Đăng nhập</NavLink>
            </form>
          </div>
          <div className="col_right">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
