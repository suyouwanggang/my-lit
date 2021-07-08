const pathToRegexp = require('path-to-regexp');

var parse1=pathToRegexp.compile('/user/list/:id');
var src=parse1({id:'2323'});


const pattern=['/user/list/:id','/user/list/my/:id(\\d+)/:name','/user/list/my/:id/:name',"/user/listList/:name(a\\d+)"];
const path=['/user/list/1000','/user/list/my/id/name','/wanggang/user/list/my/100/wanggang','/user/listList/b1000'];
const path2=['/list/1000','/user/list/my/100052/zhengming','/wanggang/user/list/my/1000/zhengming','/wanggang/user/listList/a1000'];

const matchRegMap={};

const pathMatch=function(pattern,path){
    var cache=matchRegMap[pattern];
    if(!cache){
        const keys=[];
        var reg=pathToRegexp(pattern,keys,{start:false});
        cache={
            reg:reg,
            keys:keys
        };
        matchRegMap[pattern]=cache;
    }
   
   var result= cache.reg.exec(path);

   if(result){
        var obj={};
       var keys=matchRegMap[pattern].keys;
       for(var i=0,j=keys.length;i<j;i++){
           var key=keys[i].name;
           obj[key]=result[i+1];
       }
       return obj;
   }
   return null;
};

for(let i=0,j=path.length;i<j;i++  ){
    var result=pathMatch(pattern[i],path[i]);
    console.log(`pattern =${pattern[i]} , path=${path[i]} , result=${JSON.stringify(result)}`);
};
console.log('==================');
for(let i=0,j=path2.length;i<j;i++  ){
   var result=pathMatch(pattern[i],path2[i]);
   console.log(`pattern =${pattern[i]} , path=${path2[i]} , result=${JSON.stringify(result)}`);
}



