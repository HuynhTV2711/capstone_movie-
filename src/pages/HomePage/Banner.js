import React, { useEffect, useState } from "react";
import { Carousel } from 'antd'
import { quanLyFilmServ } from "../../services/quanLyFilmServ";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../redux/slice/loadingSlice";

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} before:content-[""]`}
        style={{ ...style, display: "block", insetInlineEnd: "0px", color:"white", fontSize:"20px" }}
        onClick={onClick}
      >
        <i class="fa-solid fa-arrow-right"></i>
        </div>

    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} before:content-[""]`}
        style={{ ...style, display: "block",insetInlineStart: "0px", color:"white", fontSize:"20px", zIndex: 1}}
        onClick={onClick}
      >
        <i class="fa-solid fa-arrow-left"></i>
        </div>
    );
  }
const Banner = () => {
    const [listBanner, setListBanner] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
      // xét trang thái isActive == true để loading xuất hiện
      // sau khi gọi dữ liệu thành công sẽ tắt loading, thất bại cũng tắt loading
      dispatch(startLoading())
        quanLyFilmServ.getAllBanner()
        .then((result) => {
            // console.log(result.data.content);
            setListBanner(result.data.content);
            dispatch(endLoading())
        }).catch((err) => {
            console.log(err);
            dispatch(endLoading())
        });
    },[])

    const settings = {
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow />,
        arrows: true
    }
  return (
    <Carousel {...settings}>
        {listBanner.map((item, index)=>{
            return <div key={index}>
            <img src={item.hinhAnh} alt="" className="w-full h-[650px] object-cover"/>
          </div>
        })}
    </Carousel>
  );
};

export default Banner;



