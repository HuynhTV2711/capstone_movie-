import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { quanLyUser } from '../../services/quanLyUser';
import { useFormik } from 'formik';
import { validationUser } from '../../util/validation';

const UserManager = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // formik
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: ""
    },
    onSubmit: (values) => {
      console.log(values);
      quanLyUser.addUser(values)
      .then((result) => {
        messageApi.open({
          type: "success",
          content: "Thêm user thành công",
        });
        resetForm();
        quanLyUser.getAllUser()
      .then((result) => {
        // console.log(result.data.content);
        setListUser(result.data.content)
      }).catch((err) => {
        console.log(err);
      });

      }).catch((err) => {
        console.log(err);
      });
    },
    validationSchema: validationUser,
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
    resetForm,
  } = formik;
  // Lấy danh sách người dùng
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    quanLyUser.getAllUser()
      .then((result) => {
        // console.log(result.data.content);
        setListUser(result.data.content)
      }).catch((err) => {
        console.log(err);
      })
  }, []);
  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      render: (text, record, index) => {
        return <a>{text}</a>
      }
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      render: (text, record, index) => {
        return <a>{text}</a>
      }
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',
      render: (text, record, index) => {
        return <a>{text}</a>
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record, index) => {
        return <a>{text}</a>
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDT',
      key: 'soDT',
      render: (text, record, index) => {
        return <a>{text}</a>
      }
    },
    {
      title: 'Mã loại',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      render: (text, record, index) => {
        return <a>{text}</a>
      }
    },
    {
      title: 'Hành động',
      key: 'hanhDong',
      render: (text, record, index) => {
        // console.log(text);
        return <div className="space-x-3">
          {/* xoa phim can nhap 3 du lieu ma phim, token asscess(de biet ai xoa phim), token cybersoft */}
          <button onClick={()=>
            {
              resetForm();
              setValues(text)}} className='text-2xl text-yellow-500'><i class="fa-regular fa-pen-to-square"></i></button>
          <button onClick={() => {
            // console.log(record.taiKhoan);
            quanLyUser.deleteUser(record.taiKhoan)
              .then((result) => {
                messageApi.success({
                  type: "error",
                  content: result.data.content,
                });
                quanLyUser.getAllUser()
                  .then((result) => {
                    setListUser(result.data.content)
                  }).catch((err) => {

                  });
              }).catch((err) => {
                messageApi.open({
                  type: "error",
                  content: err.response.data.content,
                });
              });
          }} className="text-2xl text-red-500"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      }
    },


  ];
  const data = listUser;
  return (
    <>
      {contextHolder}
    <div>
      <h2 className='text-2xl font-bold text-blue-500 mb-5'>Quản lí người dùng</h2>
      <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6">
        
        {/* tài khoản */}
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
            placeholder="Vui lòng nhập tên tài khoản..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.taiKhoan}
          />
          {errors.taiKhoan && touched.taiKhoan ? <p className='text-red-500 mt-1'>{errors.taiKhoan}</p> : ""}
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
            type="password"
            id="matKhau"
            name="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Vui lòng nhập mật khẩu..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.matKhau}
          />
          {errors.matKhau && touched.matKhau ? <p className='text-red-500 mt-1'>{errors.matKhau}</p> : ""}
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
            placeholder="Vui lòng nhập email..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email ? <p className='text-red-500 mt-1'>{errors.email}</p> : ""}
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
            placeholder="Vui lòng nhập số điện thoại..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.soDt}
          />
          {errors.soDt && touched.soDt ? <p className='text-red-500 mt-1'>{errors.soDt}</p> : ""}
        </div>
        {/* hoTen */}
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
            placeholder="Vui lòng nhập họ tên..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hoTen}
          />
          {errors.hoTen && touched.hoTen ? <p className='text-red-500 mt-1'>{errors.hoTen}</p> : ""}
        </div>
        {/* Mã nhóm */}
        <div>
          <label
            htmlFor="maNhom"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Mã nhóm
          </label>
          <select id="maNhom" name="maNhom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}
            onBlur={handleBlur}
            value={values.maNhom}>
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

          {errors.maNhom && touched.maNhom ? <p className='text-red-500 mt-1'>{errors.maNhom}</p> : ""}
        </div>
        {/* Mã loại người dùng */}
        <div>
          <label
            htmlFor="hoTen"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Mã loại người dùng
          </label>
          <select id="maLoaiNguoiDung" name="maLoaiNguoiDung" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}
            onBlur={handleBlur}
            value={values.maLoaiNguoiDung}>
            <option value="">Chọn loại người dùng</option>
            <option value="QuanTri">Quản Trị</option>
            <option value="KhachHang">Khách hàng</option>
          </select>
          {errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? <p className='text-red-500 mt-1'>{errors.maLoaiNguoiDung}</p> : ""}
        </div>
        </div>
        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5'>Thêm người dùng</button>
        <button onClick={()=>{quanLyUser.updateUser(values)
        .then((result) => {
          // console.log(result);
          // alert(result.data.message);
          messageApi.open({
            type: "success",
            content: "Cập nhật thành công",
          });
          quanLyUser.getAllUser()
          .then((result) => {
            setListUser(result.data.content);
          resetForm();
          }).catch((err) => {
           
          });
        }).catch((err) => {
        // alert(err.message)
        messageApi.open({
          type: "error",
          content: "Cập nhật thất bại",
        });
        });
        }}  type='button' className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 mt-5'>Cập nhật</button>
      </form>
      <h3 className='text-xl font-bold text-blue-500 mb-5'>Danh sách người dùng</h3>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 7, defaultCurrent: 1 }} />
    
    </div>
    </>
  )
}

export default UserManager