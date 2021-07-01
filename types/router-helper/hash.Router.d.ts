import { ResovlePathInterface } from './path.helper';
export declare const HASHROUTER_EVENT = "hash-router-change";
/**
 * 申明当前路由的上下文数据
 */
export declare type contextData = {
    path: string; /***路由路径*/
    queryString?: string; /**查询字符串 */
    queryData: {
        [key in string]: string | string[];
    };
    pathData: {
        [key in string]: string;
    };
};
/**
 * 路由导航项
 */
export declare type RouterItem = {
    readonly path: string;
    readonly name?: string;
    before?: (this: RouterItem, current: contextData, last: contextData | undefined) => Promise<boolean> | boolean;
    excute?: (this: RouterItem, current: contextData, last: contextData | undefined) => Promise<boolean> | boolean;
    after?: (this: RouterItem, current: contextData, last: contextData | undefined) => Promise<boolean> | boolean;
    [key: string]: unknown;
};
/**
 * hash 导航实现
 */
export declare class HashRouter {
    private _lastHashData?;
    private _lastRouterItem?;
    private _currentHashData?;
    private _currentRouterItem?;
    private _pathResovle;
    set pathResovle(resolve: ResovlePathInterface);
    get pathResovle(): ResovlePathInterface;
    /**
     * 获取当前路由数据
     */
    get currentHashData(): contextData | undefined;
    /**
     * 当前路由匹配规则
     */
    get currentRouterItem(): RouterItem | undefined;
    /**
     * 上一次路由匹配数据
     */
    get lastHashData(): contextData | undefined;
    /**
     * 上一次路由匹配规则
     */
    get lastRouterItem(): RouterItem | undefined;
    private hashHandler;
    constructor(...routerItems: RouterItem[]);
    refreshHash(): void;
    /**
     * 存储所有路由规则
     */
    private routerItems;
    private routerPatternMap;
    private routerNameMap;
    /**
     * 根据pattern 查找路由规则项
     * @param pattern
     * @returns
     */
    getRouterItem(pattern: string): RouterItem;
    /**
     * 根据name 查找路由匹配规则
     * @param name
     * @returns
     */
    getRouterItemByName(name: string): RouterItem;
    private findMathRouterItem;
    private excuteRouterItem;
    /**
     *
     * @param newRouterItems 添加路由规则项
     */
    addRouterItem(newRouterItems: RouterItem[]): void;
    /**
     * 根据路由规则名称，来删除路由规则
     * @param names
     */
    removeRouterItemsByName(...names: string[]): void;
    /**
     * 根据 路由路径删除 路由规则
     * @param paths
     */
    removeRouterItemsByPaths(...paths: string[]): void;
    private removeRouterItems;
    unload(): void;
    /**
     * 获取当前导航数据
     * @returns
     */
    getCurrentPath(): {
        path: string;
        queryString: string;
        queryData: {
            [key: string]: string | string[];
        };
    };
    /**
     * 将url 和 jsonData 转为hash 路径,并且进行导航
     * @param url 路径,例如/user/list, /user/1000, /user/100?id=2223,
     * @param jsonData 参数 例如 {a:'1',b:'2'}
     */
    toHashPath(url: string, jsonData?: any): void;
}
declare const hashRouter: HashRouter;
export default hashRouter;
