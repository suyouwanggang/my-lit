import * as CryptoJS  from 'crypto-js';
import  {ResovlePathInterface  } from './path.helper';
const secrityKey='cryptoHashResovle&jisdk';
import {HashHelper} from './path.helper';
const secrikyObj={
    secrityKey:secrityKey,
}
/**
 * 设置加密key,获取加密key
 */
export const secrityKeyObj={
    setSecrityKey(key:string){
        secrikyObj.secrityKey=key;
    },
    getSecrityKey(){
        return secrikyObj.secrityKey;
    }
}
/**
 * crypto-js AES 加密 hash 路径
 */
const   cryptoHashResovle:ResovlePathInterface|{[key in string]:string}={
    resolvePath(hash:string){
        if (hash.length>1&&hash.substr(0,1)=='#') { 
            hash=hash.slice(1); //#,去掉
        }
        const decryptData=CryptoJS.AES.decrypt(hash,secrityKeyObj.getSecrityKey());
        return HashHelper.defaultResove.resolvePath(decryptData.toString(CryptoJS.enc.Utf8));
    },
    toPath(url:string,jsonData){
        const result=HashHelper.defaultResove.toPath(url,jsonData);
        const enryptText= CryptoJS.AES.encrypt(result,secrityKeyObj.getSecrityKey()).toString();
        return enryptText;
    }
}
export default cryptoHashResovle;