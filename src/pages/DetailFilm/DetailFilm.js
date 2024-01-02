import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quanLyFilmServ } from "../../services/quanLyFilmServ";
import moment from "moment";
import { Button, Modal } from 'antd';
import './detailFilm.css';
import { Rate } from 'antd';

const DetailFilm = () => {

    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState({});
    const [trailer, setTrailer] = useState('');
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
    }, [])
    return (
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
                        <button className='text-white bg-blue-500 px-4 py-2 font-semibold rounded mt-5'>Mua vé</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailFilm;
