
/**
 * 去掉路径最后面的 '/',如果路径不是/开始，则添加'/'到最前面,连续多个'/' 则被替换为一个'/'
 * @param path
 * @returns 
 */
 const stripExtraTrailingSlash=(path:string) =>{
     if(!path){
         return '/';
     }
     if(path.substr(0,1)!='/'){
         path='/'+path;
     }
    if (path.length !== 1 && path.substr(-1) === '/') {
        path = path.substr(0, path.length - 1);
    }
    path=path.replace(REG_REMOVE,'/');
    return path;
};
const REG_REMOVE=/[\/]{2,}/;

/**
 * 将查询字符串 转换为 json Object
 * @param queryString  查询字符串 ，类似 'a=b&c=d&asd=d'
 * @returns 
 */
const getQueryData=(queryString?:string):{[key in string]:string|string[]} =>{
   if(!queryString){
       return {};
   }
   var result:{[key in string]:string|string[]}={};
   var parames=new URLSearchParams(queryString);
   for(let p of parames.keys()){
        let array=parames.getAll(p);
        if(array.length>1){
            result[p]=array;
        }else{
            result[p]=array[0];
        }
   }
   return result;
};
/**
 * 将 json data 转化为queryString
 * @param data jsonObject 
 * @returns 
 */
const toQueryString=(data:any)=>{
    const array:string[]=[];
    for(let key in data){
        var value=data[key];
        var tempKey=encodeURIComponent(key);
        if(Array.isArray(value)){
            for(let v of value){
                array.push(tempKey+'='+encodeURIComponent(v));
            }
        }else{
            var temp=tempKey+'='+encodeURIComponent(value);
            array.push(temp);
        }
    }
    return array.join('&');
}
type mapRegMap={
    [key in string]:RegExp
};

const cachRegMap:mapRegMap={};
/**
 * 路由匹配路径 例如 '/wanggang/:id' ,/ab/b/c/:index'
 * @param pattern 
 * @returns 
 */
const patternToRegExp=(pattern:string) =>{
    if(cachRegMap[pattern]){
        return cachRegMap[pattern];
    }
    const r=new RegExp('^(|/)' + pattern.replace(/:[^\s/]+/g, '([\\w\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]+)') + '(|/)$');
    cachRegMap[pattern]=r;
    return r;
}

/**
 * 判断路径path 是否匹配 pattern 
 * ```js
 *      /user/100   -->/user/:id
 *      /home       -->/home
 * ```js
 * @param path  当前路径
 * @param pattern  路由路径
 */
const isPathURLMatchPattern=(path:string,pattern:string) =>{
    if(pattern=="*"){
        return true;
    }
    if(path==pattern){
        return true;
    }
    return patternToRegExp(pattern).test(path);
}
/**
 * 获取路由匹配的 参数值
 * pattern='/user/:id'  path='/user/1000' --> {id:1000}
 * @param pattern 
 * @param path 
 */
const getPathNames=(pattern:string,path:string)=>{
    if(isPathURLMatchPattern(path,pattern)){
        let params :{[key: string]:string}= {};
        const patternArray = pattern.split('/').filter((uri) => { return uri != '' })
        const uriArray = path.split('/').filter((uli) => { return uli != '' })
        patternArray.map((patternItem, i) => {
            if (/^:/.test(patternItem)) {
                params[patternItem.substring(1)] = uriArray[i]
            }
        })
        return params;
    }
    return {};
}
/**
 * 接口：处理解密，加密 路径和参数
 */
 export interface ResovlePathInterface{
    /**
     * 将hash 路径，转为对象 path,queryString, queryData
     * ```
     * #/wanggang/list?id=232&name=test --> {path:'/wanggang/list', queryData:{id:'232',name:'test'}}
     * ```
     * @param hash 
     */
    resolvePath(hash:string):{path:string,queryString:string,queryData:{ [key:string]:string|string[] }};
    /**
     * 将url 和jsonData 转化为 hash 路径
     * 例如：url='/wanggang/list' ,jsonData={id:1,b:2}==>   #/wanggang/list?id=1&b=2
     * @param url 
     * @param jsonData 
     */
    toPath(url:string,jsonData:JSON):string;
};
const defaultResove:ResovlePathInterface={
    resolvePath:(hash:string)=>{
        hash = decodeURI(hash);
        let hashPath = '/';
        if (hash.length>1&&hash .substr(0,1)=='#') { 
            hash=hash.slice(1); //#,去掉
        }
        let indexStart = hash.indexOf("?");
        let queryString = '';
        if (indexStart != -1) {
            hashPath = hash.slice(0, indexStart);
            hashPath=HashHelper.stripExtraTrailingSlash(hashPath);
            queryString = hash.slice(hash.indexOf("?")+1);
        }else{
            hashPath=HashHelper.stripExtraTrailingSlash(hash);
            queryString='';
        }
        return {
            path: hashPath,
            queryString: queryString,
            queryData: queryString ? HashHelper.getQueryData(queryString) : {}
        };
    },
    toPath:(url,jsonData)=>{
        const queryString=HashHelper.toQueryString(jsonData);
        return '#/'+HashHelper.stripExtraTrailingSlash(url)+(queryString?('?'+queryString):'');
    }
}

export const HashHelper={
    isPathURLMatchPattern,
    getPathNames,
    getQueryData,
    toQueryString,
    defaultResove,
    stripExtraTrailingSlash
} ;



