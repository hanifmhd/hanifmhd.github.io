import CryptoJS from 'crypto-js'

export const encrypt = string => {
  const ciphertext = CryptoJS.AES.encrypt(string, `${process.env.REACT_APP_SECRET_KEY}`)
  return ciphertext.toString()
}

export const decrypt = ciphertext => {
  if (ciphertext !== undefined) {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext.toString(),
      `${process.env.REACT_APP_SECRET_KEY}`
    )
    const plaintext = bytes.toString(CryptoJS.enc.Utf8)
    return plaintext
  }
  return ciphertext
}
