/**
 * Created by pain.xie on 2017/11/15.
 * 加密工具类
 */

import CryptoJS from 'crypto-js/crypto-js';
import md5 from 'crypto-js/md5';
import sha1 from 'crypto-js/sha1';
import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import hmac_md5 from 'crypto-js/hmac-md5';
import hmac_sha1 from 'crypto-js/hmac-sha1';
import hmac_sha256 from 'crypto-js/hmac-sha256';
import hmac_sha512 from 'crypto-js/hmac-sha512';

import aes from 'crypto-js/aes';
export default class CryptoUtils{

  static md5(message) {
    return md5(message).toString();
  }

  static sha1(message) {
    return sha1(message).toString();
  }

  static sha256(message) {
    return sha256(message).toString();
  }

  static sha512(message) {
    return sha512(message).toString();
  }

  static hmacMd5(message, key) {
    return hmac_md5(message, key).toString();
  }

  static hmacSha1(message, key) {
    return hmac_sha1(message, key).toString();
  }

  static hmacSha256(message, key) {
    return hmac_sha256(message, key).toString();
  }

  static hmacSha512(message, key) {
    return hmac_sha512(message, key).toString();
  }

  /**
   * Aes加密
   * @param message
   * @param SecretKey
   * @returns {string}
   */
  static aesEncrypt(message, SecretKey) {

    // let key = CryptoJS.enc.Utf8.parse(SecretKey);
    // let encryptedData = aes.encrypt(message, key, {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    //
    // return encryptedData.ciphertext.toString();
    let ciphertext = aes.encrypt(message, SecretKey);
    return ciphertext.toString();
  }

  /**
   * Aes解密
   * @param encryptedStr
   * @param SecretKey
   * @returns {string}
   */
  static aesDecrypt(encryptedStr, SecretKey) {

    // let key = CryptoJS.enc.Utf8.parse(SecretKey);
    // let encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr);
    // let encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    // let decryptedData = aes.decrypt(encryptedBase64Str, key, {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    //
    // return decryptedData.toString(CryptoJS.enc.Utf8);
    try {
      let bytes  = aes.decrypt(encryptedStr.toString(), SecretKey);
      let plaintext = bytes.toString(CryptoJS.enc.Utf8);
      return plaintext;
    } catch (error) {
      return null;
    }
  }
}
