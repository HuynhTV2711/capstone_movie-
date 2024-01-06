import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quanLyFilmServ } from "../../services/quanLyFilmServ";
import moment from "moment";
import { Button, Modal, Radio, Tabs, Rate } from 'antd';
import './detailFilm.css';
import { useNavigate } from 'react-router-dom';

const DetailFilm = () => {
    const navigate = useNavigate();

    const [mode, setMode] = useState('left');

    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState({});
    const [trailer, setTrailer] = useState('');
    const [maLichChieu, setMaLichChieu] = useState('');
    const [heThongRapChieu, setHeThongRapChieu] = useState([]);
    // const [cumRapChieu, setCumRapChieu] = useState([]);
    const params = useParams();
    // console.log(params.maPhim);
    useEffect(() => {
        quanLyFilmServ.detailMovie(params.maPhim)
            .then((result) => {
                console.log(result.data.content);
                setDetail(result.data.content);
                setTrailer(result.data.content.trailer.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/'));

            }).catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        quanLyFilmServ.lichChieuPhim(params.maPhim)
            .then((result) => {
                // console.log(result.data.content.heThongRapChieu
                // );
                setHeThongRapChieu(result.data.content.heThongRapChieu
                );
                // lấy mã lịch chiếu
                result.data.content.heThongRapChieu.map((item, index)=>{
                    // console.log(item);
                    item.cumRapChieu.map((itemChild, indexChild)=>{
                        // console.log(itemChild);
                        itemChild.lichChieuPhim.map((item2, index2)=>{
                            console.log(item2.maLichChieu);
                           setMaLichChieu(item2.maLichChieu);
                        })
                    })
                })
            }).catch((err) => {
                console.log(err);
            });
    }, [])
    return (
        <div>
            <div className="h-screen flex items-center justify-center">
                <div className="container">
                    <div className="grid grid-cols-2">
                        <div className="col_left">
                            <img src={detail.hinhAnh} alt="" className="h-96 mx-auto rounded" />
                        </div>
                        <div className="col_right space-y-5">
                            <p className="text-3xl text-blue-400 font-semibold">{detail.tenPhim}</p>
                            <p className="text-xl font-semibold">Ngày khởi chiếu: <span className="text-gray-500">{moment(detail.ngayKhoiChieu).subtract(10, 'days').calendar()}</span></p>
                            <p className="text-xl font-semibold">Mô tả: <span className="text-gray-500">{detail.moTa}</span></p>
                            <p className="text-xl font-semibold">Đánh giá: <Rate disabled allowHalf value={detail.danhGia} count={10} /></p>
                            <>
                                <Button className='text-white bg-green-500 px-4 py-2 font-semibold rounded mt-5 mr-5' onClick={() => setOpen(true)}>
                                    Xem trailer
                                </Button>
                                <Modal
                                    title=""
                                    centered
                                    open={open}
                                    onOk={() => setOpen(false)}
                                    onCancel={() => setOpen(false)}
                                    width={700}
                                    // height={1000}
                                    footer={null}
                                >
                                    <iframe width="800" height="400" src={trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="mx-auto"></iframe>
                                </Modal>
                            </>
                            <button onClick={()=>{navigate(`/chitietphongve/${maLichChieu}`)}} className='text-white bg-blue-500 px-4 py-2 font-semibold rounded mt-5'>Mua vé</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition={mode}
                    style={{
                        //   height: 220,
                    }}
                    items={heThongRapChieu.map((item, index) => {
                        return {
                            label: <img src={item.logo} alt="" width={50} />,
                            key: item.maHeThongRap,
                            children: <div>{item.cumRapChieu.map((item, index) => {
                                return <div>
                                    <div className="flex gap-10 mb-5">
                                        <img src={item.hinhAnh} alt="" width={50} />
                                        <div>
                                            <span className="font-semibold">{item.tenCumRap}</span>
                                            <br />
                                            <span className="text-gray-500">{item.diaChi}</span>
                                        </div>
                                    </div>
                                    <div>{item.lichChieuPhim.map((item, index) => {
                                        console.log(item);
                                        return <div>
                                            <span onClick={()=>{navigate(`/chitietphongve/${item.maLichChieu}`)}} className="text-green-500 bg-gray-300 rounded px-4 py-2">
                                                {moment(item.ngayChieuGioChieu).format('MMMM Do YYYY, h:mm:ss a')}
                                            </span>
                                        </div>
                                    })}</div>
                                </div>
                            })}</div>,
                        }
                    })}
                />
            </div>
        </div>
    );
};

export default DetailFilm;
