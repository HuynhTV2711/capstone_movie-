import {https} from './configServ'

export const userServ= {
    loginServ : (data)=>{
        // trong các phương thức của https sẽ có 2 giá trị nhận vào là chuỗi của endpoint 2 là giá trị của dât truyền lên
        return https.post("/api/QuanLyNguoiDung/DangNhap", data )
    },
}