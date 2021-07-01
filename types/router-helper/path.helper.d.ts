/**
 * 接口：处理解密，加密 路径和参数
 */
export interface ResovlePathInterface {
    /**
     * 将hash 路径，转为对象 path,queryString, queryData
     * ```
     * #/wanggang/list?id=232&name=test --> {path:'/wanggang/list', queryData:{id:'232',name:'test'}}
     * ```
     * @param hash
     */
    resolvePath(hash: string): {
        path: string;
        queryString: string;
        queryData: {
            [key: string]: string | string[];
        };
    };
    /**
     * 将url 和jsonData 转化为 hash 路径
     * 例如：url='/wanggang/list' ,jsonData={id:1,b:2}==>   #/wanggang/list?id=1&b=2
     * @param url
     * @param jsonData
     */
    toPath(url: string, jsonData?: JSON): string;
}
export declare const HashHelper: {
    isPathURLMatchPattern: (path: string, pattern: string) => boolean;
    getPathNames: (pattern: string, path: string) => {
        [key: string]: string;
    };
    getQueryData: (queryString?: string | undefined) => {
        [x: string]: string | string[];
    };
    toQueryString: (data: any) => string;
    defaultResove: ResovlePathInterface;
    stripExtraTrailingSlash: (path: string) => string;
};
