import React, { useEffect, useState } from 'react'
import { quanLyFilmServ } from '../../services/quanLyFilmServ';


const ListFilm = () => {
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
        <div className='grid grid-cols-4 w-96 mx-auto gap-5'>
            {listFilm?.map((item, index) => {
                return <div>
                    <img src={item.hinhAnh} alt="" width={100} height={100}/>
                    <p>{item.tenPhim}</p>
                    <p className='line-clamp-2'>{item.moTa}</p>
                </div>
            })}
        </div>

    )
}

export default ListFilm