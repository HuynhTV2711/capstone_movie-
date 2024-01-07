import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { quanLyRapServ } from '../../services/quanLyRapServ';
import "./lichChieuCumRap.css";
import moment from "moment";


const LichChieuCumRap = ({ maHeThongRap }) => {
    // console.log(maHeThongRap);
    const [cumRap, setCumRap] = useState([])
    useEffect(() => {
        quanLyRapServ.getInforLichChieuTheoRap(maHeThongRap)
            .then((result) => {
                // console.log(result.data.content[0].lstCumRap);
                setCumRap(result.data.content[0].lstCumRap);
            }).catch((err) => {
                console.log(err);
            });
    }, [maHeThongRap])
    return (
        <div className='cum_rap '>
            <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                style={{
                    height: 500,
                }}
                items={cumRap.map((item, index) => {
                    return {
                        label: <div className='w-96 text-left'>
                            <h2 className='truncate text-2xl uppercase text-green-500'>{item.tenCumRap}</h2>
                            <p className='truncate text-xxl uppercase text-gray-500'>{item.diaChi}</p>
                            <p className='text-red-500'>[ chi tiết]</p>
                            <hr />
                        </div>,
                        key: index,
                        children:  <div className="lich_chieu_phim sm:hidden lg:block">
                        {item.danhSachPhim.map((item, index) => {
                            // console.log(item);
                          return item.dangChieu ? (
                            <div className="flex">
                              <div className="col-left">
                                <img
                                  src={item.hinhAnh}
                                  className="w-24 h-32 object-cover"
                                  alt=""
                                />
                              </div>
                              <div className="col-right ml-5 py-3">
                                <h3 className=" font-bold text-xl mb-3">
                                  <span className="text-white bg-red-500 p-1 rounded-md me-5">
                                    C18
                                  </span>
                                  {item.tenPhim}
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                  {item.lstLichChieuTheoPhim
                                    .slice(0, 4)
                                    .map((item, index) => {
                                      return (
                                        <div className="py-2 px-4 bg-slate-100 rounded-md">
                                          <span className="text-green-500">
                                            {moment(item.ngayChieuGioChieu).format('MMMM Do YYYY, h:mm:ss a')}
                                          </span>
                                          <span className="text-red-500 ml-3">
                                            {item.ngayChieuGioChie}
                                          </span>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                    };
                })}
            />
        </div>
    )
}

export default LichChieuCumRap