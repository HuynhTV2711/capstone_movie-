import React, { useEffect, useState } from 'react'
import { quanLyFilmServ } from '../../services/quanLyFilmServ';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovieThunk } from '../../redux/slice/movieSlice';

const MovieManager = () => {
  // dispacth
  const dispacth = useDispatch();
  const {listMovie} = useSelector((state)=> state.movieSlice)
  // const [listMovie, setListMovie] = useState([]);
  useEffect(() => {
  //   quanLyFilmServ.getAllFilm()
  //     .then((result) => {
  //       console.log(result);
  //       setListMovie(result.data.content)

  //     }).catch((err) => {
  //       console.log(err);
  //     });
  // }
  // gọi dữ liệu thông qua hương thức được tạo ra từ thunk
  dispacth(getAllMovieThunk({
    hoTen: "Huỳnh"
  }));
}, []);
  const columns = [
    {
      // title tên cột
      // dataIndex là tên thuộc tính để lấy giá trị
      // key là id của cột
      title: 'Mã phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      render: (text, record, index) => {
        // text là dữ liệu của ô input
        // record là 1 phần tử nằm bên trong mảng
        // index là vị trí của phần tử đó trong mảng
        // console.log(text);
        // console.log(record);
        // console.log(index);
        return <a>{text}</a>
      }
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'age',
      render: (url) => {
        return <img src={url} alt="" className='w-20' />
      }
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      render: (text) => {
        return <p className='w-40 line-clamp-2'>{text}</p>
      }
    },
    {
      title: 'Hành động',
      key: 'hanhDong',
      render: (_, record) => {
        // console.log(record);
        return <div className="space-x-3">
          {/* xoa phim can nhap 3 du lieu ma phim, token asscess(de biet ai xoa phim), token cybersoft */}
          <button className='rounded text-white px-2 py-1 font-bold bg-yellow-500 text-center'>Sửa</button>
          <button onClick={()=>{
            quanLyFilmServ.deleteFilm(record.maPhim)
            .then((result) => {
              console.log(result);
              // goij render lai phim khi da xoa
              quanLyFilmServ.getAllFilm()
              .then((result) => {
                // setListMovie(result.data.content)
                dispacth(getAllMovieThunk());
              }).catch((err) => {
                
              });
            }).catch((err) => {
              console.log(err);
            });
          }} className='rounded text-white px-2 py-1 font-bold bg-red-500 text-center'>Xóa</button>
        </div>
      }
    },
  ];
  const data = listMovie;

  return (
    <div>
      <h3 className='text-2xl font-bold text-blue-500 mb-5'>Quản lí phim</h3>
      {/* phân trang pagination={{pageSize:3}} */}
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 3, defaultCurrent: 1 }} />
    </div>
  )
}

export default MovieManager