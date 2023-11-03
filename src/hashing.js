import { AES, enc, SHA256, HmacSHA256 } from "crypto-js";
import axios from "axios"
// asagıdaki password ileride sv bittikten sonra calısacak olan password sistemi
const res = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/getCryptoPassword`)
// const password = "password"
const password = res.data.password
// console.log(res.data.password)
export const encrypt = (text) => {
    const encryptedText = AES.encrypt(text, password).toString();
    return encryptedText;
};

export const decrypt = (encryptedText) => {
    const decryptedText = AES.decrypt(encryptedText, password).toString(enc.Utf8);
    return decryptedText;
};

export const hash = (text) => {
    const hash = SHA256(text).toString();
    return hash;
};

export const hmac = (text, key) => {
    const hmac = HmacSHA256(text, key).toString();
    return hmac;
};
