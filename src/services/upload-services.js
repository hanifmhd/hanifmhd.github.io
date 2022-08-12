import axios from 'axios'

class UploadFilesService {
  upload (file, status, signal, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('user_id', status)
    return axios.post('http://159.223.72.199/api/testingPost', formData, {
      signal,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': 'U1CH57o2kmojoHLTgMazyezYdCvANOSHmwbFOUBF'
      },
      onUploadProgress
    })
  }

  getFiles () {
    return axios.get('http://159.223.72.199/testing')
  }

  cancelAxios (file, status, onUploadProgress) {
    const source = axios.CancelToken.source(file, onUploadProgress)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('user_id', status)
    return axios.post('http://159.223.72.199/api/testingPost', { formData }, {
      cancelToken: source.token
    },
    onUploadProgress
    )
  }
}
export default new UploadFilesService()
