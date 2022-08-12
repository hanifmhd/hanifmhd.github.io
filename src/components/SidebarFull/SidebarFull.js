import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Dashboard from '../../assets/icon/Dashboard_Active.png'
import SidebarIcon from '../../assets/icon/SidebarIcon.png'
import PropTypes from 'prop-types'

function SidebarFull ({ showSidebar, id, className }) {
  const hideSidebar = () => {
    showSidebar(false)
  }

  return (
      <div className={classnames(`min-h-screen bg-white shadow-md shadow- border-grey border-[#E6F5EB] relative ${className} `)} >
        {/* <div> */}
            <h4 className={classnames('text-[#006D24] font-semibold leading-[32px] tracking-[0.25px] text-[24px] text-center mt-[32px] mr-[40px] font-poppins mb-[25px]')}>
                Panel Admin
            </h4>
            <hr/>
            <Link to="/">
                <div style={{ height: '52px' }} className={classnames('flex flex-row p-[24px] bg-[#E6F5EB] mt-[28px] items-center relative rounded-tr-lg rounded-br-lg mr-[15px]')}>
                    <div className={classnames('absolute h-[52px] mr-[8px] w-[6px] bg-[#009933] left-0 rounded-tr-md rounded-br-md')}>&nbsp;</div>
                    <img className={classnames('w-[20px] h-[20px]')} src={Dashboard}/>  <span className={classnames('font-semibold tracking-[0.0035em] text-[#33AD5C] ml-[15px]')}>Laporan</span>
                </div>
            </Link>

            {/* Dashboard */}
            {/* <Link to="/">
                <div style={{height:"52px"}} className={classnames(`flex flex-row p-[24px] bg-[#E6F5EB] mt-[28px] items-center relative rounded-tr-lg rounded-br-lg mr-[10px]`)}>
                    <div className={classnames(`absolute h-[52px] mr-[8px] w-[6px] bg-[#009933] left-0 rounded-tr-md rounded-br-md`)}>&nbsp;</div>
                    <img className={classnames(`w-[20px] h-[20px]`)} src={Dashboard}/>  <span className={classnames(`font-semibold tracking-[0.0035em] text-[#33AD5C] ml-[15px]`)}>Dashboard</span>
                </div>
            </Link> */}

            {/*  Pesanan */}
            {/* <Link to="/pesanan">
            <div style={{height:"52px"}} className={classnames(`h-[52px] flex flex-row p-[24px] min-w-screen mt-2 items-center`)}>
                <img className={classnames(`w-[20px] h-[20px]`)} src={Pesanan}/> <span className={classnames(`font-semibold tracking-[0.0035em] text-[#003E60] ml-[15px]`)}>Pesanan</span>
            </div>
            </Link> */}

            {/* Produk */}
            {/* <Link to="/produk">
            <div style={{height:"52px"}} className={classnames(`h-[52px] flex flex-row p-[24px] min-w-screen mt-2 items-center`)}>
                <img className={classnames(`w-[20px] h-[20px]`)} src={Produk}/> <span className={classnames(`font-semibold tracking-[0.0035em] text-[#003E60] ml-[15px]`)}>Produk</span>
            </div>
            </Link> */}

             {/* Koordinator */}
             {/* <Link to="/koordinator">
             <div style={{height:"52px"}} className={classnames(`h-[52px] flex flex-row p-[24px] min-w-screen mt-2 items-center`)}>
                <img className={classnames(`w-[20px] h-[20px]`)} src={Koordinator}/>  <span className={classnames(`font-semibold tracking-[0.0035em] text-[#003E60] ml-[15px]`)}>Koordinator Lapangan</span>
            </div>
            </Link> */}

            {/* Agronom */}
            {/* <Link to="/agronom">
            <div style={{height:"52px"}} className={classnames(`h-[52px] flex flex-row p-[24px] min-w-screen mt-2 items-center`)}>
                <img className={classnames(`w-[20px] h-[20px]`)} src={Agronom}/> <span className={classnames(`font-semibold tracking-[0.0035em] text-[#003E60] ml-[15px]`)}>Agronom</span>
            </div>
            </Link> */}

             {/* Mitra */}
             {/* <Link to="/mitra">
             <div style={{height:"52px"}} className={classnames(`h-[52px] flex flex-row p-[24px] min-w-screen mt-2 items-center`)}>
                <img className={classnames(`w-[20px] h-[20px]`)} src={Mitra}/><span className={classnames(`font-semibold tracking-[0.0035em] text-[#003E60] ml-[15px]`)}> Mitra</span>
            </div>
            </Link> */}

        {/* </div> */}
        <button className={classnames('w-[45px] rounded-full h-[45px] z-99 bg-white flex items-center place-content-center shadow-md border border-slate-200 shadow-[#00000] absolute top-[25px] right-[-20px]')} onClick={() => { hideSidebar() }}>
            <img className={classnames(' w-[20px] h-[20px]')} src={SidebarIcon}/>
        </button>
      </div>
  )
}

SidebarFull.propTypes = {
  showSidebar: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  id: PropTypes.string,
  className: PropTypes.string
}
export default SidebarFull
