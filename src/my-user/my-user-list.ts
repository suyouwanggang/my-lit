
import { LitElement, html, customElement, property } from 'lit-element'
import  hashRouter  from '../router-helper/hash.Router';

@customElement('my-user-list')
export default class MyUserList extends LitElement  {
  
  /**
   * The name to say "Hello" to.
   */
  @property()
  location?:string ;

  @property()
  url:string='';
  @property()
  userID?:string;

  constructor(){
    super();  
  }
  
  firstUpdated(map:any){
    super.firstUpdated(map);
    const data=hashRouter.currentHashData;

    this.location=data?.path;
    this.userID=data?.pathData['id'] as string;

  }
  disconnectedCallback(){
    super.disconnectedCallback();
  }


  render() {
    return html`
        <p>${this.location} </p>
        ${this.userID? html` <span> userID=${this.userID}</span>`:''}
        <input type='text' value=${this.url} @change=${(event:Event) =>{
            this.url=(event.target as HTMLInputElement).value;
        }} /> 
        <p> last hashData:${JSON.stringify(hashRouter.lastHashData)}</p>
        <p> hashData:${JSON.stringify(hashRouter.currentHashData)}</p>
        <a href="#/user/list/1">1</a>
        <a href="#/user/list/2">2</a>
        <a href="#/user/list/3">3</a>
        <a @click=${this.goTo} href=${'#/'+this.url}>导航到</a>
    `
  }
  
  private goTo(){
    

  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-user-list': MyUserList
  }
}
