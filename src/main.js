

import 'lit-element';
import hashRouter  from './router-helper/hash.Router';
import  cryptoHashResovle from './router-helper/CryptoHashResolve';
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
    if(name){
        if(name=='my-element'){
            import ('./my-user/my-element');
        }
        if(name=='my-user-list'){
            import ('./my-user/my-user-list');
        }
        if(ctx.path=='/user/list'){
            app.innerHTML="userList";
            return ;
        }
       var el= document.createElement(name);
       app.innerHTML='';
       app.appendChild(el);
       el.dispatchEvent(new CustomEvent('router-page'));
    }
};
hashRouter.addRouterItem([
    {path:'/',excute:handler,name:'my-element'},
    {path:'/user/list',excute:handler,name:'my-user-list'},
    {path:'/user/list/:id',excute:handler,name:'my-user-list'},
])

