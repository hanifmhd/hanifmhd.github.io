import React, { useCallback } from 'react'
import DropzoneComp from './DropzoneComp'
import PropTypes from 'prop-types'

function CardDropzone ({
  title,
  closeModal,
  temporaryDoc,
  removeDataFileDoc,
  formatUpload,
  tipeUpload,
  maksimalUpload
}) {
  const [dropzoneState, setDropzoneState] = React.useState({
    selectedFiles: []
  })

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    acceptedFiles.map((file) => {
      setDropzoneState(prevState => ({
        ...prevState,
        selectedFiles: [
          ...prevState.selectedFiles, {
            Dokumen: file,
            status: 'sukses'
          }
        ]
      }))
      return true
    })
    fileRejections.map((file) => {
      setDropzoneState(prevState => ({
        ...prevState,
        selectedFiles: [
          ...prevState.selectedFiles, {
            Dokumen: file.file,
            status: 'error',
            errors: file.errors
          }
        ]
      }))
      return true
    })
  }, [])

  const removeDataFile = (index) => {
    setDropzoneState(prevState => ({
      ...prevState,
      selectedFiles: dropzoneState.selectedFiles.filter((city, i) => i !== index)
    }))
  }

  return (
    <>
       {
       <DropzoneComp
        onDrop={onDrop}
        closeModal={closeModal}
        title={title}
        dropzoneStateProps={dropzoneState}
        removeDataFile={(index, type) => { removeDataFile(index, type) }}
        removeDataFileDoc={(index) => { removeDataFileDoc(index) }}
        temporaryDoc={temporaryDoc}
        formatUpload = {formatUpload}
        tipeUpload={tipeUpload}
        maksimalUpload = {maksimalUpload}
        />
        }

    </>
  )
}

CardDropzone.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  temporaryDoc: PropTypes.array,
  removeDataFileDoc: PropTypes.func,
  formatUpload: PropTypes.object,
  tipeUpload: PropTypes.string,
  maksimalUpload: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

export default CardDropzone
