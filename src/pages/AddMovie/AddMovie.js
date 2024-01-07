import React, { useState } from "react";
import { DatePicker, Switch, Rate, message } from "antd";
import { useFormik } from "formik";
import { validationPhimInput } from "../../util/validation";
import './addMovie.css'
import { quanLyFilmServ } from "../../services/quanLyFilmServ";

const AddMovie = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // hình ảnh
  const [image, setImage] = useState("");
  // formik
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: true,
      sapChieu: true,
      hot: true,
      danhGia: 5,
      hinhAnh: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      for (const key in values) { 
        // console.log(key);
        // console.log(values[key]);
        if (key == 'hinhAnh') {
          formData.append("File", values[key]);
        }
        else{
          formData.append(key, values[key])
        }
        // console.log(formData);
      }
      formData.append("maNhom", "GP09")
      quanLyFilmServ.addMovie(formData)
      .then((result) => {
        resetForm();
        setImage('');
        messageApi.open({
          type: "success",
          content: "Thêm phim thành công",
        });
      }).catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data.content,
        });
      });
    },
    validationSchema: validationPhimInput,
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
    setFieldValue,
  } = formik;
  return (
    <>
      {contextHolder}
    <div>
      <h2 className="text-2xl font-bold text-blue-500 mb-5" >
        Tạo mới film
      </h2>
      <form onSubmit={handleSubmit}>
        {/* tên phim */}
        <div className="mb-5">
          <label
            htmlFor="tenPhim"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Tên phim
          </label>
          <input
            type="text"
            id="tenPhim"
            name="tenPhim"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Vui lòng nhập tên phim..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tenPhim}
          />
          {errors.tenPhim && touched.tenPhim ? <p className='text-red-500 mt-1'>{errors.tenPhim}</p> : ""} 
        </div>
        {/* trailer */}
        <div className="mb-5">
          <label
            htmlFor="trailer"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Trailer
          </label>
          <input
            type="text"
            id="trailer"
            name="trailer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Vui lòng nhập trailer..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.trailer}
          />
          {errors.trailer && touched.trailer ? <p className='text-red-500 mt-1'>{errors.trailer}</p> : ""}
        </div>
        {/* mô tả */}
        <div className="mb-5">
          <label
            htmlFor="moTa"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Mô tả
          </label>
          <input
            type="text"
            id="moTa"
            name="moTa"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Vui lòng nhập mô tả..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.moTa}
          />
          {errors.moTa && touched.moTa ? <p className='text-red-500 mt-1'>{errors.moTa}</p> : ""}
        </div>
        {/* Ngày khởi chiếu */}
        <div className="mb-5">
          <label
            htmlFor="ngayKhoiChieu"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Ngày khởi chiếu
          </label>
          <DatePicker
            id="ngayKhoiChieu"
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
            onChange={(date, dateString)=>{
              // console.log(date);
              // console.log(dateString);
              // setFieldValue("tên thuộc tính", giá trị)
              setFieldValue("ngayKhoiChieu", dateString)
              // setFieldValue("ngayKhoiChieu", date)
            }}
            changeOnBlur={handleBlur}
          />
          {errors.ngayKhoiChieu && touched.ngayKhoiChieu ? <p className='text-red-500 mt-1'>{errors.ngayKhoiChieu}</p> : ""}
        </div>
        {/* đang chiếu */}
        <div className="mb-5">
          <label
            htmlFor="dangChieu"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Đang chiếu
          </label>
          <Switch
            id="dangChieu"
            name="dangChieu"
            onChange={(checked, event)=>{
              setFieldValue("dangChieu", checked);
            }}
            onBlur={handleBlur}
            value={values.dangChieu}
          />
        </div>
        {/* sắp chiếu */}
        <div className="mb-5">
          <label
            htmlFor="sapChieu"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Sắp chiếu
          </label>
          <Switch
            id="sapChieu"
            name="sapChieu"
            onChange={(checked, event)=>{
              setFieldValue("sapChieu", checked);
            }}
            onBlur={handleBlur}
            value={values.sapChieu}
          />
        </div>
        {/* hot */}
        <div className="mb-5">
          <label
            htmlFor="hot"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Hot
          </label>
          <Switch
            id="hot"
            name="hot"
            onChange={(checked, event)=>{
              setFieldValue("hot", checked);
            }}
            onBlur={handleBlur}
            value={values.hot}
          />
        </div>
        {/* Số sao */}
        <div className="mb-5">
          <label
            htmlFor="danhGia"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Số sao
          </label>
          <Rate
            allowHalf
            name="danhGia"
            id="danhGia"
            onChange={(value)=>{
              setFieldValue("danhGia", value)
            }}
            // onBlur={handleBlur}
            value={values.danhGia}
          />
        </div>
        {/* Hình ảnh */}
        <div className="mb-5">
          <label
            htmlFor="hinhAnh"
            className="block mb-2 text-sm font-medium text-gray-900 text-blue-400"
          >
            Hình ảnh
          </label>
          <img src={image} alt="" className="w-1/2" />
          <input
            type="file"
            name="hinhAnh"
            id="hinhAnh"
            // chỉ cho phép người dùng truyền lên file ảnh
            accept="image/*"
            onChange={(event)=>{
              // Lấy dữ liệu từ file gửi lên
              // console.log(event.target.files[0]);
              let img = event.target.files[0];
              if (img) {
                const urlImg = URL.createObjectURL(img);
                // console.log(urlImg);
                setImage(urlImg);
              }
              setFieldValue("hinhAnh", img)           
            }}
            // value={values.hinhAnh}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-green-500 rounded px-3 py-2"
        >
          Thêm phim
        </button>
      </form>
    </div>
    </>
  );
};

export default AddMovie;

