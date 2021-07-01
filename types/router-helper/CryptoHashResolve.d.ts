import { ResovlePathInterface } from './path.helper';
/**
 * 设置加密key,获取加密key
 */
export declare const secrityKeyObj: {
    setSecrityKey(key: string): void;
    getSecrityKey(): string;
};
/**
 * crypto-js AES 加密 hash 路径
 */
declare const cryptoHashResovle: ResovlePathInterface | {
    [key in string]: string;
};
export default cryptoHashResovle;
