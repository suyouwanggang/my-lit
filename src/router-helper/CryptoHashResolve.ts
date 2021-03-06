import * as CryptoJS  from 'crypto-js';
import {HashHelper,ResovlePathInterface} from './path.helper';
const secrityKey='wanggang`zhengming&5566&easytrack';
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
const   cryptoHashResovle:ResovlePathInterface={
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