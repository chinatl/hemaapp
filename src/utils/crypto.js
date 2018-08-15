import CryptoJS from 'crypto-js'
const key = 'xiansuozhaogongyuanzhongyang';
export default message => {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}