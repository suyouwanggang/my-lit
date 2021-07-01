
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
  @property()
  private jsonData:any;

  constructor(){
    super();  
  }
  firstUpdated(map:any){
    super.firstUpdated(map);
    const data=hashRouter.currentHashData;
    this.location=data!.path;
    this.userID=data!.pathData['id'] as string;
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
      <p></p>
      <textarea  value=${this.jsonData} @change=${(event:Event) =>{
            this.jsonData=(event.target as HTMLInputElement).value;
        }} ></textarea> 
        <p> last hashData:${JSON.stringify(hashRouter.lastHashData)}</p>
        <p> hashData:${JSON.stringify(hashRouter.currentHashData)}</p>
        <a href="/" @click=${this.clickGoTo}>///</a>
        <a href="/user/list/1?str=王刚" @click=${this.clickGoTo}>1</a>
        <a href="/user/list/2?isdf=sdf" @click=${this.clickGoTo}>2</a>
        <a href="/user/list/3" @click=${this.clickGoTo}>3</a>
        <a @click=${this.goButtonTo} >导航到</a>
    `
  }
  private clickGoTo(event:Event){
    event.preventDefault();
    var href=(event.target as any).getAttribute('href');
    hashRouter.toHashPath(href);
  }
  private goButtonTo(){
    var d=this.jsonData?JSON.parse(this.jsonData):undefined;
    hashRouter.toHashPath(this.url,d);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-user-list': MyUserList
  }
}
