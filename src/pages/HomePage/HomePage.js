import React from 'react'
import Banner from './Banner'
import ListFilm from './ListFilm'
import LichChieuTheoRap from './LichChieuTheoRap'
import LichChieuCumRap from './LichChieuCumRap'

const HomePage = () => {
  return (
    <div>
        <Banner/>
        <ListFilm/>
        <LichChieuTheoRap/>
    </div>
  )
}

export default HomePage