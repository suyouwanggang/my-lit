export type chaianInter=(...result:any[])=>Promise<boolean>|boolean;

function isPromise<T>(obj:any) :obj is Promise<T> {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
/**
 * 责任链处理数据封装类
 */
export default class ChainHanlder{
    private _chainList: chaianInter[]=[];
    /**
     * 增加处理器
     * @param item 待添加处理器 
     */
    public addChain(item:chaianInter){
        this._chainList.push(item);
    }
    private currentIndex=0;
    private currentResult:boolean=true;
    /**
     * 责任链模式来数据，如果前面一个返回false, 则停止，否则交给下一个责任链处理。
     * @param arg  待处理的数据，
     * @returns 
     */
    public excute(...arg:any[]){
        if(this.currentIndex>=this._chainList.length || !this.currentResult){
            this.reset();
            return ;
        }
        let temp=this._chainList[this.currentIndex++];
        let tempResult=temp(...arg);
        if(isPromise<boolean>(tempResult)){
            tempResult.then((result) =>{
                this.currentResult=result;
                this.excute(...arg);
            })
        }else{
            this.currentResult=tempResult;
            this.excute(...arg);
        }
    }
    private reset(){
        this.currentIndex=0;
        this.currentResult=true;    
    }
}