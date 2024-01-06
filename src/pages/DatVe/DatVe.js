import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { quanLiDatVeServ } from '../../services/quanLiDatVeServ';
import './DatVe.css';
import { message } from 'antd';

const DatVe = () => {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(prevState => !prevState); // Đảo ngược giá trị isClicked
      };
    // ant
    const [messageApi, contextHolder] = message.useMessage();
    const params = useParams();
    const [gheChon, setGheChon] = useState([]);
    const chonGhe = (item) => {
        setGheChon(prevArray => [...prevArray, item]);
    }
    const [danhSachGhe, setDanhSachGhe] = useState([]);
    const [thongTinPhim, setThongTinPhim] = useState([]);
    useEffect(() => {
        quanLiDatVeServ.layDanhSachPhongVe(params.maLichChieu)
            .then((result) => {
                setDanhSachGhe(result.data.content.danhSachGhe);
                setThongTinPhim(result.data.content.thongTinPhim)
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            {contextHolder}
            <div className='container'>
                <div className='flex justify-between'>
                    <div className='grid grid-cols-12 gap-5 mb-10'>{danhSachGhe.map((item, index) => {
                        let disabled = false;
                        let cssGheDaDat = '';
                        if (item.daDat) {
                            cssGheDaDat = "ghe_da_dat";
                            disabled = true;
                        } else {
                            if (item.loaiGhe == "Vip") {
                                cssGheDaDat = "ghe_vip";
                            } else {
                                cssGheDaDat = "ghe_thuong";
                            }
                        }
                        return <button key={index} className={`${cssGheDaDat} ghe`} disabled={disabled} onClick={() => {
                                    chonGhe(item);
                                }
                        }>
                            {item.tenGhe}
                        </button>
                    })}</div>
                    <div className='mx-auto'>
                        <div className='shadow-2xl mb-10 p-10'>
                            <p className='font-bold text-3xl text-blue-500'>{thongTinPhim.tenPhim}</p>
                            <p className='font-bold text-lg'>Cụm rạp: <span className='text-green-500 font-semibold'>{thongTinPhim.tenCumRap}</span></p>
                            <p className='font-bold text-lg'>Địa chỉ: <span className='text-green-500 font-semibold'>{thongTinPhim.diaChi}</span></p>
                            <p className='font-bold text-lg'>Rạp: <span className='text-green-500 font-semibold'>{thongTinPhim.tenRap}</span></p>
                            <p className='font-bold text-lg'>Ngày giờ chiếu: <span className='text-green-500 font-semibold'>{thongTinPhim.ngayChieu} <span className='text-red-500 font-semibold'>{thongTinPhim.gioChieu}</span></span></p>
                            <p className='font-bold text-lg'>Chọn:

                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Số ghế
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Giá
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                gheChon.map((item, indexx) => {
                                                    return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.tenGhe}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item.giaVe}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button className='text-red-500 text-xl' onClick={() => {setGheChon(prevItems => prevItems.filter((_, index) => index !== indexx));}}><i class="fa-regular fa-trash-can"></i></button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Tổng tiền:
                                                </th>
                                                <td className="px-6 py-4">
                                                    {gheChon.reduce((tong, item) => {
                                                        return tong + item.giaVe
                                                    }, 0)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </p>
                            <button className='font-bold text-xl px-4 py-2 bg-orange-400 text-white w-96' onClick={() => {
                                if (gheChon != "") {
                                    quanLiDatVeServ.datVe({
                                        "maLichChieu": params.maLichChieu,
                                        "danhSachVe": gheChon,
                                    })
                                        .then((result) => {
                                            console.log(result);
                                            messageApi.open({
                                                type: 'success',
                                                content: result.data.content,

                                            });
                                            quanLiDatVeServ.layDanhSachPhongVe(params.maLichChieu)
                                                .then((result) => {
                                                    setDanhSachGhe(result.data.content.danhSachGhe);
                                                }).catch((err) => {
                                                    // console.log(err);
                                                });
                                        }).catch((err) => {
                                            messageApi.open({
                                                type: 'error',
                                                content: err,
                                            });
                                        });
                                } else {
                                    messageApi.open({
                                        type: 'error',
                                        content: "Vui lòng chọn ghế!!!",
                                    });
                                }

                            }}>Đặt vé</button>
                        </div>
                        <div className='space-y-3 p-10'>
                            <div className='flex space-x-3 items-center'>
                                <div className='ghe ghe_thuong'></div>
                                <span className='text-xl font-semibold text-gray-500'>Thường</span>
                            </div>
                            <div className='flex space-x-3 items-center'>
                                <div className='ghe ghe_vip'></div>
                                <span className='text-xl font-semibold text-gray-500'>Vip</span>
                            </div>
                            <div className='flex space-x-3 items-center'>
                                <div className='ghe ghe_dang_chon'></div>
                                <span className='text-xl font-semibold text-gray-500'>Đang chọn</span>
                            </div>
                            <div className='flex space-x-3 items-center'>
                                <div className='ghe ghe_da_dat'></div>
                                <span className='text-xl font-semibold text-gray-500'>Đã đặt</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default DatVe