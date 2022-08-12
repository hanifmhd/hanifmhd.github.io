/* eslint-disable quotes */
import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import classnames from 'classnames'
import Button from '../../components/Button/Button'
import Close from '../../assets/icon/close.png'
import DisabledClose from '../../assets/icon/disabled_close.png'
import Reupload from '../../assets/icon/reupload.png'
import approve from '../../assets/icon/approve.png'
import reject from '../../assets/icon/reject.png'
import DropzoneImage from '../../assets/icon/dropzone.png'
import pending from '../../assets/icon/history.png'
import PropTypes from 'prop-types'
import Snackbar from '../Snackbar/Snackbar'

function DropzoneComp ({ onDrop, closeModal, title, removeDataFile, dropzoneStateProps, temporaryDoc, removeDataFileDoc, formatUpload, tipeUpload, maksimalUpload }) {
  const [convertMB, setConvertMB] = React.useState(0)
  const { getRootProps, getInputProps } =
  useDropzone({
    onDrop,
    accept: formatUpload,
    maxSize: maksimalUpload
  })

  useEffect(() => {
    const convertSize = maksimalUpload / 1000000
    setConvertMB(`${convertSize}MB`)
  }, [])
  const [dropzoneState] = React.useState(
    {
      selectedFiles: [],
      progressInfos: [],
      message: [],
      fileInfos: []
    }
  )

  // function upload (idx, file, status, upload) {
  //   const _progressInfos = [...dropzoneState.progressInfos]
  //   try {
  //     abortController.current = new AbortController()
  //     if (status === 'sukses' || upload === 'reupload') {
  //       UploadService.upload(file, status, abortController.current.signal, (event) => {
  //         const persentaseLoader = Math.round(
  //           (100 * event.loaded) / event.total
  //         )
  //         _progressInfos[idx].percentage = persentaseLoader
  //         setDropzoneState((prevState) => ({
  //           ...prevState,
  //           _progressInfos
  //         }))
  //       })
  //         .then((response) => {
  //           setDropzoneState((prevState) => ({
  //             ...prevState,
  //             progressInfos: _progressInfos,
  //             message: [
  //               ...prevState.message,
  //               'Uploaded the file successfully: ' + file.name
  //             ]
  //           }))
  //         })
  //         .catch((error) => {
  //           console.log("error", error)
  //           _progressInfos[idx].percentage = 0
  //           setDropzoneState((prevState) => ({
  //             ...prevState,
  //             progressInfos: _progressInfos,
  //             message: [
  //               ...prevState.message,
  //               'Could not upload the file: ' + file.name
  //             ]
  //           }))
  //         })
  //     } else {
  //       setDropzoneState((prevState) => ({
  //         ...prevState,
  //         progressInfos: _progressInfos,
  //         message: [
  //           ...prevState.message,
  //           'Could not upload the file: ' + file.name
  //         ]
  //       }))
  //     }
  //   } catch (error) {
  //     alert("Cancel Request")
  //   }
  // }

  // React.useEffect(() => {
  //   const selectedFiles = dropzoneStateProps.selectedFiles
  //   if (selectedFiles?.length > 0) {
  //     if (selectedFiles.length > countEffect) {
  //       if (dropzoneState.progressInfos[countEffect].upload === 'upload') {
  //         upload(countEffect, selectedFiles[countEffect].Dokumen, selectedFiles[countEffect].status, selectedFiles[countEffect].upload)
  //       }
  //     }
  //     setCountEffect(countEffect + 1)
  //   }
  //   return () => {
  //     abort.abort()
  //   }
  // }, [dropzoneState.progressInfos])

  // Upload Files
  function uploadFiles () {
    alert("Upload")
  }

  const onHandleRemove = (index, variant) => {
    removeDataFile(index)
    dropzoneState.message.splice(index, 1)
    dropzoneState.progressInfos.splice(index, 1)
    // abortController.current && abortController.current.abort()
  }

  const checkIconUpload = (message, loader) => {
    if (message) {
      return reject
    } else if (loader !== 100 && !message) {
      return pending
    } else if (loader === 100 && !message) {
      return approve
    }
  }
  const handleIconUpload = (index, variant) => {
    if (dropzoneState.progressInfos[index] !== undefined) {
      if (variant === 'error') {
        return reject
      } else {
        return checkIconUpload(dropzoneState?.message[index]?.includes('Could not upload the file'), dropzoneState.progressInfos[index].percentage)
      }
    } else {
      if (variant === 'sukses') {
        return approve
      } else {
        return reject
      }
    }
  }

  const checkRemoveFile = (message, loader, index, status) => {
    if (message && status !== 'error') {
      return (
        <>
        <button className={classnames('absolute right-[10px]')} onClick={() => {
          alert("Reupload")
        }}>
          <img className={classnames('w-[14px]')} src={Reupload}/>
        </button>
        </>
      )
    } else if (status === 'error') {
      return (
        <>
        <button className={classnames('absolute right-[10px]')} onClick={() => { onHandleRemove(index, status) }}>
          <img className={classnames('w-[14px]')} src={Close}/>
        </button>
        </>
      )
    } else if (loader > 0 && loader < 100 && !message) {
      return (
        <>
        <button className={classnames('absolute right-[10px] cursor-default')} >
          <img className={classnames('w-[14px]')} src={DisabledClose}/>
        </button>
        </>
      )
    } else if (loader === 100 && !message) {
      return (
        <>
        <button className={classnames('absolute right-[10px]')} onClick={() => { onHandleRemove(index, status) }}>
          <img className={classnames('w-[14px]')} src={Close}/>
        </button>
        </>
      )
    } else {
      return (
        <>
        <button className={classnames('absolute right-[10px]')} onClick={() => { onHandleRemove(index, status) }}>
          <img className={classnames('w-[14px]')} src={Close}/>
        </button>
        </>
      )
    }
  }

  return (
    <>
      <div className={classnames('mb-[48px] w-full relative')}>

          <button className={classnames('w-[24px] absolute right-[16px] top-[0px]')} onClick={() => { closeModal() }}>
              <img src={Close} />
          </button>
          <h4 className={classnames('text-[18px] font-semibold font-poppins')}>Unggah {title}</h4>
      </div>

      <div className={classnames('items-center flex flex-col border-2 border-dashed border-[#33AD5C] rounded-lg relative')}>
        <div {...getRootProps({ className: 'dropzone', disabled: true })}>
          <input
          {...getInputProps()} />
            {
              ((dropzoneStateProps.selectedFiles.length < 1 || dropzoneStateProps.selectedFiles === undefined)) && (
              <div className={classnames('flex flex-col  items-center py-[34px] px-[24px] ')}>
                    <img src={DropzoneImage} className={classnames('w-[72px]')} alt="icon_dropzone"/>
                    <p className={classnames('text-[14px] font-semibold font-poppins mt-[24px]')}>Seret dan tempel untuk mengunggah dokumen</p>
                    <p className={classnames('text-[14px] font-poppins mt-[8px] text-[#BABEC1]')}>atau tekan tombol di bawah ini</p>
                    <Button text="Pilih Dokumen" variant="success" noFill classProps="mt-[24px] !py-[8px] text-[14px] rounded-[6px]" onClick={() => {}}/>
                </div>
              )
            }
        </div>
        {(dropzoneStateProps.selectedFiles.length > 0) && (
              <div className={classnames('flex justify-center flex-col py-[34px] px-[24px]')}>
                {
                  dropzoneStateProps.selectedFiles?.length > 0 && dropzoneStateProps.selectedFiles.map((selected, index) => (
                    <>
                    <div key={index} className={classnames(`flex  mb-[19px] w-[264px] items-center relative `)}>
                        <img src={handleIconUpload(index, selected?.status)}
                        className={classnames('w-[18px] h-[18px]')}/>
                        <p className={classnames(`ml-[12px] text-[12px] ${(selected.errors || dropzoneState?.message[index]?.includes('Could not upload the file')) && 'text-[#FF0025]'}`)}>{selected?.Dokumen?.name}</p>
                        {/*  */}
                        {
                          checkRemoveFile(dropzoneState?.message[index]?.includes('Could not upload the file'), dropzoneState?.progressInfos[index]?.percentage, index, selected?.status)
                        }
                        {/*  */}
                    </div>
                    </>
                  ))
                }
                  <Button text="Tambah Dokumen" variant="success" noFill classProps="mt-[24px] !py-[8px] text-[14px] rounded-[6px]" {...getRootProps()}/>
              </div>
        )}
        <Snackbar type="danger" text={`Dokumen harus dalam format ${tipeUpload} dan maksimal ${convertMB}`} classProps={classnames(` ${dropzoneStateProps.selectedFiles.findIndex(x => x.errors) >= 0 ? 'visible opacity-1  easy-in' : ' invisible opacity-0 ease-in-out'} transition duration-700 absolute left-0 right-0  !bottom-[15px] text-left z-99 mr-auto ml-auto !py-[6px] !px-[16px]  !text-[16px] `)}/>

      </div>
      <div className={classnames('flex justify-end border-t border-[#D7DCDF] mt-[40px] z-99')}>
          <Button text="Batalkan" variant="noColor" noFill classProps="mt-[24px] !py-[8px] text-[14px] rounded-[6px] mr-[8px]" onClick={() => { closeModal() }}/>

          <Button text="Unggah" variant="success" noFill classProps="mt-[24px] !py-[8px] text-[14px] rounded-[6px]" onClick={() => { uploadFiles() }}/>
      </div>
    </>
  )
}

DropzoneComp.propTypes = {
  onDrop: PropTypes.any,
  closeModal: PropTypes.any,
  title: PropTypes.any,
  removeDataFile: PropTypes.any,
  dropzoneStateProps: PropTypes.any,
  temporaryDoc: PropTypes.array,
  removeDataFileDoc: PropTypes.func,
  formatUpload: PropTypes.object,
  tipeUpload: PropTypes.string,
  maksimalUpload: PropTypes.number
}

export default DropzoneComp
