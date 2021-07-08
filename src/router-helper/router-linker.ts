import { LitElement, html, customElement, property } from 'lit-element'
import hashRouter  from '../router-helper/hash.Router';
/**
 * router link Element.
 *
 * @slot - This element has a slot
 * @csspart link - The button
 */
@customElement('p-router-link')
export default class RouterLink extends LitElement  {
  
     @property({attribute:false})
     src!:string;
     @property({attribute:false})
     external:boolean=false;

     @property({type:Object,attribute:false})
    data!:Object;
    render(){
        return html`<a part='link' @click=${this.goToLink} .href=${this.src} .data=${this.data} ><slot></slot></a>`;
    }
   private  goToLink(event:Event){
        let result=  this.dispatchEvent(new CustomEvent('before-router',{
            cancelable:true,
        }));
        if(result&&!this.external){
            event.preventDefault();
            hashRouter.toHashPath(this.src, this.data||{});
        }
    }
}

declare global {
  interface HTMLElementTagNameMap{
    'p-router-link': RouterLink
  }
}
