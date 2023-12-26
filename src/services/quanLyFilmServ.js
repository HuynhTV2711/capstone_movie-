import {https} from './configServ'
export const quanLyFilmServ ={
    getAllBanner : ()=>{
        // trong các phương thức của https sẽ có 2 giá trị nhận vào là chuỗi của endpoint 2 là giá trị của dât truyền lên
        return https.get("/api/QuanLyPhim/LayDanhSachBanner", )
    },
    getAllFilm : ()=>{
        return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
    },
}