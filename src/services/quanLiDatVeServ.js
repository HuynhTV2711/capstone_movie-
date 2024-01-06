import {https} from './configServ'
export const quanLiDatVeServ ={
   layDanhSachPhongVe: (maLichChieu)=>{
    return https.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
   },
   datVe:(data)=>{
      return https.post(`/api/QuanLyDatVe/DatVe`, data)
   }
}