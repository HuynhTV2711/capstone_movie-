import React, { useEffect, useState } from 'react'
import { quanLyFilmServ } from '../../services/quanLyFilmServ';
import { useNavigate } from 'react-router-dom';


const ListFilm = () => {
    const navigate = useNavigate();
    const [listFilm, setListFilm] = useState([]);
    useEffect(() => {
            quanLyFilmServ.getAllFilm()
                .then((result) => {
                    // console.log(result);
                    setListFilm(result.data.content)
                }).catch((err) => {
                    console.log(err);
                });
        },[])
    return (
        <div className='grid grid-cols-1 lg:grid md:grid sm:grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 container mx-auto gap-5 mt-10'>
            {listFilm?.map((item, index) => {
                return <div className='px-4 py-4 rounded bg-gray-100'>
                    <img src={item.hinhAnh} alt="" className='mx-auto w-96 max-h-64 object-cover rounded'/>
                    <p className='text-xl font-bold'>{item.tenPhim}</p>
                    <p className='text-sm font-semibold text-gray-500 line-clamp-2'>{item.moTa}</p>
                    <button onClick={()=>{navigate(`/detail/${item.maPhim}`)}} className='text-white bg-blue-500 px-4 py-2 font-semibold rounded mt-5'>Mua vé</button>
                </div>
            })}
        </div>

    )
}

export default ListFilm