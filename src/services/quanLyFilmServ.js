import {https} from './configServ'
export const quanLyFilmServ ={
    getAllBanner : ()=>{
        // trong các phương thức của https sẽ có 2 giá trị nhận vào là chuỗi của endpoint 2 là giá trị của dât truyền lên
        return https.get("/api/QuanLyPhim/LayDanhSachBanner", )
    },
    getAllFilm : ()=>{
        return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09")
    },
    deleteFilm: (maPhim)=>{
        return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    },
    addMovie: (data)=>{
        return https.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, data)
    },
    detailMovie: (maPhim)=>{
        return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
}