import { https } from "./configServ";
export const quanLyRapServ={
    getAllRap:()=>{
        return https.get("/api/QuanLyRap/LayThongTinHeThongRap")
    },
    getInforLichChieuTheoRap:(maHeThongRap)=>{
        return https.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`)
    }
}