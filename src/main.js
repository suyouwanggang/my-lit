

import 'lit-element';
import hashRouter  from './router-helper/hash.Router';
import  cryptoHashResovle from './router-helper/CryptoHashResolve';
const my_userModules=import.meta.globEager('./my-user/*.ts');
var app=document.getElementById('app');
hashRouter.pathResovle=cryptoHashResovle;
/**
 * 
 * @param {import('./router-helper/hash.Router').contextData} ctx 
 * @param {import('./router-helper/hash.Router').contextData} last 
 */
const handler=(ctx,last)=>{
    var item=hashRouter.currentRouterItem;
    
    var name=item.name;
    if(item.require&&item.folder){
       // import (`./${item.folder}/${item.require}.ts`);
    }
    if(name){
        var el= document.createElement(name);
        app.innerHTML='';
        app.appendChild(el);
        el.dispatchEvent(new CustomEvent('router-page'));
     }
};
hashRouter.addRouterItem([
    {path:'/',excute:handler,name:'my-element',require:'my-element',folder:'my-user'},
    {path:'/user/list',excute:handler,name:'my-user-list',require:'my-user-list',folder:'my-user'},
    {path:'/user/list/:id',excute:handler,name:'my-user-list',require:'my-user-list',folder:'my-user'},
])

