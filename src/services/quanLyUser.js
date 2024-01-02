import {https} from './configServ'
export const quanLyUser ={
    getAllUser : ()=>{
        // trong các phương thức của https sẽ có 2 giá trị nhận vào là chuỗi của endpoint 2 là giá trị của dât truyền lên
        return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01", )
    },
    deleteUser: (taiKhoan)=>{
        return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    },
    addUser: (data)=>{
        return https.post(`api/QuanLyNguoiDung/ThemNguoiDung`, data)
    },
    updateUser: (data)=>{
        return https.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data)
    }
}