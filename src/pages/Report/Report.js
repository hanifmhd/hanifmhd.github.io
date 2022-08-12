/* eslint-disable no-useless-escape */
/* eslint-disable comma-spacing */import React, { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import PropTypes from 'prop-types'
//
// import useRefreshToken from '../../hooks/useRefreshToken'
//
import Card from '../../components/Card/Card'
import TitlePages from '../../components/TitlePages/TitlePages'
import CardUpload from '../../components/CardUpload/CardUpload'
import InputPhoneNew from '../../components/InputPhone/InputPhoneNew'
import Dropdown from '../../components/Dropdown/Dropdown'
import CardDropzone from '../../components/CardDropzone/CardDropzone'
import classnames from 'classnames'

// Asset
import Drone from '../../assets/icon/Drone.png'
import IOT from '../../assets/icon/IOT.png'
import RekAgronom from '../../assets/icon/Agronom.png'
import TesLab from '../../assets/icon/TesLab.png'
import VideoDok from '../../assets/icon/VideoDok.png'
import Search from '../../assets/icon/Search.png'
import Button from '../../components/Button/Button'
//
import Modal from 'react-modal'
import { EMPTY_DOC, FORMAT_DOC, FORMAT_DRONE, FORMAT_VIDEO, ID_AGRONOM, ID_DOKUMENTASI, ID_DRONE, ID_IOT, ID_TEST_LAB, MAX_SIZE_DEFAULT, TITLE_AGRONOM, TITLE_DOKUMENTASI, TITLE_DRONE, TITLE_IOT, TITLE_TEST_LAB, TYPE_DOC, TYPE_DRONE, TYPE_VIDEO } from './helpers'
//
//
function Report ({ showSide }) {
  const initialForm = {
    phone: '',
    nama_lahan: ''
  }

  const initialDropdown = {
    title: 'Masukkan nomor ponsel terlebih dahulu',
    disabledDropdown: true,
    alertDropdown: false,
    validasiMessage: ''
  }

  const initialCountDokumen = {
    doc_drone_mapping: EMPTY_DOC,
    doc_sensor_iot: EMPTY_DOC,
    doc_test_lab: EMPTY_DOC,
    doc_agronom: EMPTY_DOC,
    doc_video: EMPTY_DOC
  }

  const initialOptionLahan = [
    {
      label: 'Testing Nama Lahan 1',
      value: '677'
    },
    {
      label: 'Testing Nama Lahan 2',
      value: '678'
    }
  ]

  // const navigate = useNavigate()
  // const location = useLocation()
  // const axiosPrivate = useAxiosPrivate()
  // const refresh = useRefreshToken()

  const [formData, setFormData] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dropdownState, setDropdownState] = useState(initialDropdown)
  const [showCardLaporan, setShowCardLaporan] = useState(false)
  const [clickShowCard, setClickShowCard] = useState(false)
  const [optionLahan, setOptionLahan] = useState(initialOptionLahan)
  const [title, setTitle] = useState('')
  const [idUpload, setIDUpload] = useState()
  const [showAlert, setShowAlert] = useState({
    status: false,
    message: ''
  })
  const [configUpload, setConfigUpload] = useState({
    formatUpload: {},
    typeUpload: '',
    maksimalUpload: ''
  })
  const [countDokumen, setCountDokumen] = useState(initialCountDokumen)
  const [temporaryDoc, setTemporaryDoc] = useState([])

  const onChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const onChangeDropdown = (name, value) => {
    if (showCardLaporan) {
      setShowCardLaporan(false)
      setTimeout(() => {
        setShowCardLaporan(true)
      },500)
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const searchLahan = () => {
    setOptionLahan([])
    setOptionLahan(initialOptionLahan)
    setClickShowCard(false)
    setShowAlert({
      status: false,
      message: ''
    })
    setShowCardLaporan(false)
    setDropdownState((prevState) => ({
      ...prevState,
      title: 'Pilih Lahan',
      disabledDropdown: false
    }))
    setFormData((prevState) => ({
      ...prevState,
      nama_lahan: ''
    }))
  }

  const openDocument = () => {
    if (formData.nama_lahan === '') {
      setDropdownState((prevState) => ({
        ...prevState,
        alertDropdown: true,
        validasiMessage: 'Nama lahan wajib diisi'
      }))
      return false
    }
    setClickShowCard(true)
    setCountDokumen({
      doc_drone_mapping: [],
      doc_sensor_iot: [],
      doc_test_lab: [],
      doc_agronom: [],
      doc_video: []
    })
    setDropdownState((prevState) => ({
      ...prevState,
      alertDropdown: false,
      validasiMessage: ''
    }))
    setShowCardLaporan(true)
    setTimeout(() => {
      setLoading(false)
    },100)
  }

  const onClick = (id, title, arrayDoc, formatUpload, typeUpload, maksimalUpload) => {
    setTitle(title)
    setIDUpload(id)
    setTemporaryDoc(arrayDoc)
    setShowModal(true)
    setConfigUpload({
      formatUpload,
      typeUpload,
      maksimalUpload
    })
  }
  const closeModal = (id) => {
    setShowModal(false)
  }
  // On Change Data
  return (
    <>
     {/* Snackbar */}
    <TitlePages title="Unggah Laporan"/>
    <Card title="Buka Data Lahan" color="#009933" classProps={`ease-out duration-1000   ${showSide ? 'sm:w-[100%] md:w-[70%] ' : 'w-[90%]'} relative`}>
      <div className={classnames('flex flex-row w-full gap-4 flex-auto ')}>
          <div className={classnames('relative w-full ')}>
            <InputPhoneNew
              classProps={' w-full flex-col'}
              classPropsInput={'text-[14px]'}
              placeholder="82100001234"
              valueSet={`${formData.phone}`}
              iconRight={Search}
              onChange={(name, value) => { onChange(name, value) }}
              onClickIcon={() => {
                searchLahan()
              }}
              name="phone"
              label="Nomor Ponsel User"
              type="tel"
              typeInput="default"
              validateOptions={
                {
                  minLen: 8,
                  maxLen: 15
                }
              }
            />
            {
              showAlert && (
                <p className={classnames('text-[14px] leading-[20px] font-poppins text-[#FF0025] absolute bottom-[-25px]')}>
                  {showAlert.message}
                </p>
              )
            }
          </div>
          <Dropdown
            label="Nama Lahan"
            className="nama_lahan"
            id="nama_lahan"
            name="nama_lahan"
            validationMessage={dropdownState.validasiMessage}
            onChange={(name, value) => {
              onChangeDropdown(name, value)
            }}
            placeholder={dropdownState.title}
            options={optionLahan}
            value={formData.nama_lahan}
            classProps="text-left"
            required
            isDisabled={dropdownState.disabledDropdown}
          />
      </div>
        {
          !showCardLaporan && !clickShowCard && (
            <div className={classnames('flex justify-end mt-[61px]')}>
              <Button text="Buka Daftar Dokumen" variant="success" noFill onClick={() => { openDocument() }}/>
            </div>
          )
        }
        </Card>
    {/* Buka Dokumen */}
    {
      showCardLaporan && (
        <Card
          title="Buka Data Lahan"
          color="#009933"
          classProps={`ease-out duration-1000   ${showSide ? 'w-[70%]' : 'w-[90%]'}`}
        >

             <div className={classnames('grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-7 ')}>
                <CardUpload
                  onClick={() => { onClick(ID_DRONE, TITLE_DRONE, countDokumen.doc_drone_mapping,FORMAT_DRONE, TYPE_DRONE, MAX_SIZE_DEFAULT) }}
                  title={TITLE_DRONE}
                  subTitle={countDokumen.doc_drone_mapping.length > 0 ? countDokumen.doc_drone_mapping.length + ' dokumen' : EMPTY_DOC}
                  icon={Drone}
                  opacity={!loading ? 1 : 0}
                />
                <CardUpload
                  onClick={() => { onClick(ID_AGRONOM, TITLE_AGRONOM, countDokumen.doc_agronom, FORMAT_DOC, TYPE_DOC, MAX_SIZE_DEFAULT) }}
                  title={TITLE_AGRONOM}
                  subTitle={countDokumen.doc_agronom.length > 0 ? countDokumen.doc_agronom.length + ' dokumen' : EMPTY_DOC}
                  icon={RekAgronom}
                  opacity={!loading ? 100 : 0}
                  />
                <CardUpload
                  onClick={() => { onClick(ID_IOT, TITLE_IOT, countDokumen.doc_sensor_iot, FORMAT_DOC, TYPE_DOC, MAX_SIZE_DEFAULT) }}
                  title={TITLE_IOT}
                  subTitle={countDokumen.doc_sensor_iot.length > 0 ? countDokumen.doc_sensor_iot.length + ' dokumen' : EMPTY_DOC}
                  icon={IOT}
                  opacity={!loading ? 100 : 0}
                />
                <CardUpload
                  onClick={() => { onClick(ID_DOKUMENTASI, TITLE_DOKUMENTASI, countDokumen.doc_video,FORMAT_VIDEO, TYPE_VIDEO, MAX_SIZE_DEFAULT) }}
                  title={TITLE_DOKUMENTASI}
                  subTitle={countDokumen.doc_video.length > 0 ? countDokumen.doc_video.length + ' dokumen' : EMPTY_DOC}
                  icon={VideoDok}
                  opacity={!loading ? 100 : 0}
                />

                <CardUpload
                  onClick={() => { onClick(ID_TEST_LAB, TITLE_TEST_LAB, countDokumen.doc_test_lab, FORMAT_DOC, TYPE_DOC, MAX_SIZE_DEFAULT) }}
                  title={TITLE_TEST_LAB}
                  subTitle={countDokumen.doc_test_lab.length > 0 ? countDokumen.doc_test_lab.length + ' dokumen' : EMPTY_DOC}
                  icon={TesLab}
                  opacity={!loading ? 1 : 0}
                />
            </div>
        </Card>
      )
    }
    <Modal
        isOpen={showModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgb(0 29 45/ 50%)',
            zIndex: 1,
            overflowX: 'auto'
          },
          content: {
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 'none',
            left: '5%',
            right: '5%',
            inset: '20% 50%',
            transform: 'translateX(-50%)',
            boxShadow: '0px 10px 13px rgb(17 38 146 / 5%)',
            borderEadius: '6px',
            width: '720px',
            padding: '28px 32px 24px 32px',
            overflow: 'inherit',
            height: 'fit-content',
            position: 'relative'
          }
        }}
      >
        <CardDropzone
          title={title}
          closeModal={() => { closeModal() }}
          idUpload= {idUpload}
          temporaryDoc= {temporaryDoc}
          formatUpload={configUpload.formatUpload}
          tipeUpload={configUpload.typeUpload}
          maksimalUpload={configUpload.maksimalUpload}
        />
      </Modal>
    </>
  )
}

Report.propTypes = {
  showSide: PropTypes.bool
}

export default Report
