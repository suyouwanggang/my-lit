import {Router} from '@vaadin/router';
import 'lit-element';
const myUserModules=import.meta.glob('./my-user/*.ts');
for(let key in myUserModules){
    myUserModules[key]();
}
const app=document.getElementById('app');
/**
 * @type {Router}
 */
const router=new Router(app);

router.setRoutes([
    {path:'/',component:'my-element', action:(context,command)=>{
        import ('./my-user/my-element');
    }},
    {path:'/user/list/:id',component:'my-user-list'}
    
])
export default router;