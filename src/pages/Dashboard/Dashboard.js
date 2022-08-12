// import React, {useEffect, useState} from 'react'
// import { Link } from "react-router-dom"
// import { useSelector, useDispatch } from 'react-redux';
// import { get } from 'lodash/fp'
// import * as actionLogin from '../../store/actions/login/login.actions';
// import axios from 'axios'
// import Card from '../../components/Card/Card'
// import CardUpload from '../../components/CardUpload/CardUpload'
// import classnames from 'classnames'
// // Asset
// import Drone from '../../assets/icon/Drone.png'
// import IOT from '../../assets/icon/IOT.png'
// import Koordinator from '../../assets/icon/Koordinator.png'
// import RekAgronom from '../../assets/icon/RekAgronom.png'
// import TesLab from '../../assets/icon/TesLab.png'
// import VideoDok from '../../assets/icon/VideoDok.png'
// //
// import Modal from 'react-modal';
// //

// function Dashboard() {
//   const [testing, setTesting] = useState();
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(()=>{
//     dispatch(
//       actionLogin.getProduct(),
//     ).then((resData)=>{
//       console.log("Res Data", resData)
//     }).catch((error)=>{
//        throw error
//     })
//   },[])

//   useEffect(()=>{
//     setTimeout(() => {
//         setLoading(false)
//     }, 200);
//   },[])

//   const onClick = (id) =>{
//     console.log("ID : ", id)
//     setShowModal(true)
//   }

//   return (
//     <>
//     <Card title="Daftar Laporan" color="#009933">
//     <div className={classnames(`grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-7 ml-[29px] mr-[29px]`)}>
//           <CardUpload onClick={()=>{onClick('drone')}} title="Hasil Drone Mapping" subTitle="Tidak ada dokumen" icon={Drone} opacity={!loading ? 1 : 0}/>
//           <CardUpload onClick={()=>{onClick('iot')}} title="Hasil Test Lab - Tanah" subTitle="Tidak ada dokumen" icon={IOT} opacity={!loading ? 1 : 0}/>
//           <CardUpload onClick={()=>{onClick('koordinator')}} title="Hasil Sensor IoT" subTitle="Tidak ada dokumen" icon={Koordinator} opacity={!loading ? 100 : 0}/>
//           <CardUpload onClick={()=>{onClick('agronom')}} title="Rekomendasi Agronom" subTitle="Tidak ada dokumen" icon={RekAgronom} opacity={!loading ? 100 : 0}/>
//           <CardUpload onClick={()=>{onClick('teslab')}} title="Laporan Kegiatan" subTitle="Tidak ada dokumen" icon={TesLab} opacity={!loading ? 100 : 0}/>
//           <CardUpload onClick={()=>{onClick('videodok')}} title="Video Dokumentasi" subTitle="Tidak ada dokumen" icon={VideoDok} opacity={!loading ? 100 : 0}/>
//        </div>
//     </Card>
//     <Modal
//         isOpen={showModal}
//         style={{
//           overlay: {
//             backgroundColor: 'rgb(35 45 66 / 75%)',
//             zIndex: 1,
//             overflowX: 'auto',
//           },
//           content: {
//             backgroundColor: "#ffffff",
//             color: "#000000",
//             border: 'none',
//             left: '5%',
//             right: '5%',
//             inset: '20% 50%',
//             transform: 'translateX(-50%)',
//             boxShadow: '0px 10px 13px rgb(17 38 146 / 5%)',
//             borderEadius: '6px',
//             width: '740px',
//             padding: '0px 32px 10px 32px',
//             overflow: 'inherit',
//             height: 'fit-content',
//           },
//         }}
//       >
//           <Card title="Unggah  Hasil Drone Mapping" color="">
//             <div className={classnames(`w-[656px] h-[253px] border-dashed border-2 border-[#33AD5C] rounded-md`)}>

//             </div>
//           </Card>
//       </Modal>
//     </>
//   )
// }

// export default Dashboard
