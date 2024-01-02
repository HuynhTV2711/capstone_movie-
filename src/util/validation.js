import * as Yup from 'yup'
export const validationPhimInput = Yup.object({
    // Nơi chứa các thuôc tính từ initialValue cần validation
    // string kiểm trâ kiểu chuỗi
    // required kiểm tra dữ liệu rỗng
    
    tenPhim:Yup.string().required("Vui lòng không vỏ trống"),
      trailer: Yup.string().required("Vui lòng không vỏ trống"),
      moTa:Yup.string().required("Vui lòng không vỏ trống"),
      ngayKhoiChieu:Yup.string().required("Vui lòng không vỏ trống"),
      // dangChieu:Yup.string().required("Vui lòng không vỏ trống"),
      // sapChieu:Yup.string().required("Vui lòng không vỏ trống"),
      // hot:Yup.string().required("Vui lòng không vỏ trống"),
      danhGia:Yup.string().required("Vui lòng không vỏ trống"),
      // hinhAnh:Yup.string().required("Vui lòng chọn file ảnh"),
      
});

export const validationUser = Yup.object({
  taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
      matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      email: Yup.string().required("Vui lòng không bỏ trống").email("Định dạng email chưa đúng"),
      soDt: Yup.string().required("Vui lòng không bỏ trống").matches(/^(0|84)(\d{9,10})$/, "Số điện thoại 9-10 số bắt đầu bằng 0 hoặc 84"),
      maNhom: Yup.string().required("Vui lòng chọn mã nhóm"),
      maLoaiNguoiDung: Yup.string().required("Vui lòng chọn loại người dùng"),
      hoTen:Yup.string().required("Vui lòng không bỏ trống"),
})
export const validationRegister = Yup.object({
  taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
      matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      email: Yup.string().required("Vui lòng không bỏ trống").email("Định dạng email chưa đúng"),
      soDt: Yup.string().required("Vui lòng không bỏ trống").matches(/^(0|84)(\d{9,10})$/, "Số điện thoại 9-10 số bắt đầu bằng 0 hoặc 84"),
      maNhom: Yup.string().required("Vui lòng chọn mã nhóm"),
      // maLoaiNguoiDung: Yup.string().required("Vui lòng chọn loại người dùng"),
      hoTen:Yup.string().required("Vui lòng không bỏ trống"),
})