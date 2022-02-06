import { Injectable } from '@angular/core';
import { IRequestParamsBase } from '../interfaces/irequest-params-base';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';
import { LocalStorageService } from './local-storage.service';
import * as crypto from 'crypto-js';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  public generateRequestParameter(serviceId: string, requestParams?: any): string {

    const requestParamsBase: IRequestParamsBase = {
      request: {
        serviceId,
        requestParams
      }
    };
    return (JSON.stringify(requestParamsBase));
  }

  public encrypt(input:string):string{

    let encrypted=input;
    try {
      const key = crypto.enc.Latin1.parse(this.localStorageService.read(LocalStoragekeysModel.encKey));
    const iv = crypto.enc.Latin1.parse(env.AES.iv);
    const requestEncrypted = crypto.AES.encrypt(input, key, {
      iv,
      blockSize: 16,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
      formatter: crypto.enc.Base64
    });   

    encrypted= requestEncrypted.ciphertext.toString();
    } catch (error) {
      
    } 
    //console.log(input,encrypted);
    return encrypted;
  }

  public decryptor(crypt: any):string {
    let decryptedText="";
    try {
      crypt = { ciphertext: crypto.enc.Hex.parse(crypt) };    

      decryptedText = crypto.AES.decrypt(crypt,
        crypto.enc.Utf8.parse(this.localStorageService.read(LocalStoragekeysModel.encKey)), {
        iv: crypto.enc.Utf8.parse(env.AES.iv),
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
      }).toString(crypto.enc.Utf8);     
    } catch (error) {
     
    }
    return decryptedText;
  }
}


