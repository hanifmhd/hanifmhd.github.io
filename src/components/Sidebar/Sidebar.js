import React from 'react'
// import { Link } from 'react-router-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ButtonSidebar from '../ButtonSidebar/ButtonSidebar'
// import NonUser from '../../assets/icon/non_user.png'
// import ActUser from '../../assets/icon/act_user.png'
// import NonPesanan from '../../assets/icon/non_pesanan.png'
// import ActPesanan from '../../assets/icon/act_pesanan.png'
// import NonProduct from '../../assets/icon/non_product.png'
// import ActProduct from '../../assets/icon/act_product.png'
// import NonInvoice from '../../assets/icon/non_invoice.png'
// import ActInvoice from '../../assets/icon/act_invoice.png'
// import NonHome from '../../assets/icon/non_home.png'
import ActHome from '../../assets/icon/act_home.png'
// Disabled
// import DisableProduct from '../../assets/icon/disable_product.png'

function Sidebar ({ className }) {
  return (
      <div className={classnames(`w-20  bg-[#3D3F40] absolute mt-[136px] rounded-[20px] rounded-bl-none  ${className}`)}>
            {/* <ButtonSidebar title="Pesanan" icon={ActPesanan} url="/" />
            <ButtonSidebar title="Sumber Daya" icon={NonUser} url="/sumber-daya" />
            <ButtonSidebar title="Produk" icon={NonProduct} url="/product" />
            <ButtonSidebar title="Invoice" icon={NonInvoice} url="/invoice" /> */}
            <ButtonSidebar classProps={classnames('!pb-[30px]')} title="Laporan" icon={ActHome} url="/" />
      </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string
}

export default Sidebar
