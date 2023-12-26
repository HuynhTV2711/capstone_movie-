import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { quanLyRapServ } from '../../services/quanLyRapServ';
import LichChieuCumRap from './LichChieuCumRap';

const LichChieuTheoRap = () => {
    const [listRap, setListRap] = useState([]);
    useEffect(()=>{
       quanLyRapServ.getAllRap()
        .then((result) => {
            // console.log(result.data.content);
            setListRap(result.data.content)
        }).catch((err) => {
            console.log(err);
        });
    }, [])
  return (
    <div className='py-20 container'>
        
    <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        style={{
        //   height: 220,
        }}
        items={listRap.map((item, index) => {
          return {
            // lable hiển thị nội dung cho tab
            label:<img src={item.logo} alt="" width={50} /> ,
            // key giúp người dùng biết đang đứng ở tab nào
            key: item.maHeThongRap,
            //  disable ngắn chặn người dùng click vào
            // disabled: id === 28,
            //children là các nội dung hiển thị bên trong
            children: <LichChieuCumRap maHeThongRap = {item.maHeThongRap}/>,
          };
        })}
      />
    </div>
  )
}

export default LichChieuTheoRap