import ChainHanlder from './chainHanlder';
import { HashHelper, ResovlePathInterface } from './path.helper';
export const HASHROUTER_EVENT = 'hash-router-change';
/**
 * 申明当前路由的上下文数据
 */
export type contextData={
    path:string, /***路由路径*/
    queryString?:string,/**查询字符串 */
    queryData:{[key in string]:string|string[]},
    pathData:{[key in string]:string},
};
/**
 * 路由导航项
 */
export type RouterItem={
    readonly  path:string,
    readonly  name?:string,
    before?:(this:RouterItem,current:contextData,last:contextData|undefined)=>Promise<boolean>|boolean,
    excute?:(this:RouterItem,current:contextData,last:contextData|undefined)=>Promise<boolean>|boolean,
    after?:(this:RouterItem,current:contextData,last:contextData|undefined)=>Promise<boolean>|boolean,
    [key: string]:unknown;
};



/**
 * hash 导航实现
 */
export  class HashRouter {
    private _lastHashData?:contextData=undefined;
    private _lastRouterItem?:RouterItem=undefined;

    private _currentHashData?:contextData=undefined;
    private _currentRouterItem?:RouterItem=undefined;

    private _pathResovle:ResovlePathInterface=HashHelper.defaultResove;

    public set pathResovle(resolve:ResovlePathInterface){
        this._pathResovle=resolve;
    }
    get pathResovle(){
        return this._pathResovle;
    }
    /**
     * 获取当前路由数据
     */
    get currentHashData(){
        return this._currentHashData;
    };
    /**
     * 当前路由匹配规则
     */
    get currentRouterItem(){
        return this._currentRouterItem;
    };
    
    /**
     * 上一次路由匹配数据
     */
    get lastHashData(){
        return this._lastHashData;
    };
    /**
     * 上一次路由匹配规则
     */
    get lastRouterItem(){
        return this._lastRouterItem;
    };
    
    private hashHandler: () => void;
    constructor(...routerItems:RouterItem[]) {
        console.log(`init hash router  `);
        this.hashHandler = () => {
            let fundItem=this.findMathRouterItem();
            let detailObj={
                last:this.lastHashData,
                lastRouterItem:this.lastRouterItem,
                currentRouter:fundItem,
                current:this.getCurrentPath()
            };
            let detailOption={
                detail:detailObj,
                composed:true,
                cancelable:true
            };
           let result=window.dispatchEvent(new CustomEvent(`${HASHROUTER_EVENT}-before`, detailOption));
           if(result){
                result=window.dispatchEvent(new CustomEvent(`${HASHROUTER_EVENT}`,detailOption));
                if(result){
                    if(fundItem){
                        this.excuteRouterItem(fundItem);
                    }
                    window.dispatchEvent(new CustomEvent(`${HASHROUTER_EVENT}-after`, detailOption));
                }
            }
        };
        window.addEventListener('hashchange', this.hashHandler);
        window.addEventListener('load', this.hashHandler);
        if(routerItems){
            this.addRouterItem(routerItems);
        }
    }
    public  refreshHash(){
        this.hashHandler();
    }
    /**
     * 存储所有路由规则
     */
    private routerItems:RouterItem[]=[];
    private routerPatternMap:{[key: string]:RouterItem}={ };  
    private routerNameMap:{[key: string]:RouterItem}={  };
    /**
     * 根据pattern 查找路由规则项
     * @param pattern 
     * @returns 
     */
    public getRouterItemByPath(pattern:string){
        return this.routerPatternMap[pattern];
    }
    /**
     * 根据name 查找路由匹配规则
     * @param name
     * @returns 
     */
    public getRouterItemByName(name:string){
        return this.routerNameMap[name];
    }
    private findMathRouterItem(){
        const path=this.getCurrentPath().path;
        let match=false;
        for(let temp of this.routerItems){
            match=HashHelper.isPathURLMatchPattern(path,temp.path);
            if(match){
                return temp;
            }
        }
        let notFound=this.getRouterItemByName('not-found');
        if(notFound){
            return notFound;
        }
        return undefined;
    }

    private   excuteRouterItem(item:RouterItem) {
        const currentPath=this.getCurrentPath();
        const currentData={
            ...currentPath,
            pathData:HashHelper.getPathNames(item.path,currentPath.path),
        };
        this._lastHashData= this.currentHashData;
        this._lastRouterItem=this.currentRouterItem;
        this._currentHashData=currentData;
        this._currentRouterItem=item;
        const handler=new ChainHanlder();
        if(item.before){
            handler.addHanlder(item.before.bind(item));
        }
        if(item.excute){
            handler.addHanlder(item.excute.bind(item));
        }if(item.excute){
            handler.addHanlder(item.excute.bind(item));
        }if(item.after){
            handler.addHanlder(item.after.bind(item));
        }
        handler.excute(currentData,this.lastHashData);
    }
    /**
     * 
     * @param newRouterItems 添加路由规则项，如果路径已经存在的，则替换。
     */
    public addRouterItem(newRouterItems:RouterItem[]):void {
        for(let r of newRouterItems){
            let p=this.routerPatternMap[r.path];
            if(p){//已经存在了,则删除原来的，然后替换
                let index=this.routerItems.indexOf(p);
                if(index>=0){
                    let old=this.routerItems[index];
                    if(old.name){
                        delete this.routerNameMap[old.name];
                        delete this.routerPatternMap[r.path];
                    };
                    this.routerItems[index]=r;
                }
            }else{
                this.routerItems.push(r);
            }
            this.routerPatternMap[r.path]=r;
            if(r.name){
                this.routerNameMap[r.name]=r;
            }
        }
    }
    /**
     * 根据路由规则名称，来删除路由规则
     * @param names 
     */
    public removeRouterItemsByName(...names:string[]){
        for(let r of names){
            let p= this.routerNameMap[r];
            if(p){
                this.removeRouterItems(p);
            }
        }
    }
    /**
     * 根据 路由路径删除 路由规则
     * @param paths 
     */
    public removeRouterItemsByPaths(...paths:string[]){
        for(let r of paths){
            let p= this.routerPatternMap[r];
            if(p){
                this.removeRouterItems(p);
            }
        }
    }
    private removeRouterItems(...items:RouterItem[]){
        for(let r of items){
            let index=this.routerItems.indexOf(r);
            if(index>=0){
                this.routerItems.splice(index,1);
                if(r.name){
                    delete this.routerNameMap[r.name];
                };
                if(r.path){
                    delete this.routerPatternMap[r.path];
                };
            }
        }
    }
    unload() {
        window.removeEventListener('hashchange', this.hashHandler);
        window.removeEventListener('load', this.hashHandler);
    };
    /**
     * 获取当前导航数据 
     * @returns 
     */
    getCurrentPath() {
       let hash = decodeURI(window.location.hash);
       return this.pathResovle.resolvePath(hash);
    }
    /**
     * 将url 和 jsonData 转为hash 路径,并且进行导航
     * @param url 路径,例如/user/list, /user/1000, /user/100?id=2223,
     * @param jsonData 参数 例如 {a:'1',b:'2'}
     */
    toHashPath(url:string,jsonData?:any){
        const {path, queryData}=HashHelper.defaultResove.resolvePath(url);
        jsonData=Object.assign({},queryData,jsonData);
        window.location.hash=this.pathResovle.toPath(path,jsonData);
    }
};

const hashRouter=new HashRouter();
export default hashRouter;