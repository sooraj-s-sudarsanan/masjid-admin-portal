import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  create(key: string, data: any, toEncrypt = false) {
    if (toEncrypt) {
      data = CryptoJS.AES.encrypt(data, environment.aesEncrptionKey).toString();
    }
    localStorage.setItem(key, data);
  }

  read(key: string, toDecrypt = false) {
    let decryptData = localStorage.getItem(key);
    if (toDecrypt && decryptData) {
      decryptData = CryptoJS.AES.decrypt(decryptData, environment.aesEncrptionKey).toString(CryptoJS.enc.Utf8);
    }
    return decryptData;
  }

  update(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
