export declare type chaianInter = (...result: any[]) => Promise<boolean> | boolean;
/**
 * 责任链处理数据封装类
 */
export default class ChainHanlder {
    private _chainList;
    /**
     * 增加处理器
     * @param item 待添加处理器
     */
    addHanlder(item: chaianInter): void;
    private currentIndex;
    private currentResult;
    /**
     * 责任链模式来数据，如果前面一个返回false, 则停止，否则交给下一个责任链处理。
     * @param arg  待处理的数据，
     * @returns
     */
    excute(...arg: any[]): void;
    private reset;
}
