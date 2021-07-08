
import { LitElement, html, customElement, property } from 'lit-element'
import  hashRouter  from '../router-helper/hash.Router';
import  '../router-helper/router-linker';
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
        ${this.userID? html` <span> userID=${this.userID}</span>`:''}<br/>
        <input type='text' value=${this.url} @change=${(event:Event) =>{
            this.url=(event.target as HTMLInputElement).value;
        }} /> 
      <p></p>
       <textarea  value=${this.jsonData} @change=${(event:Event) =>{
            this.jsonData=(event.target as HTMLInputElement).value;
        }} ></textarea> 
        <button @click=${this.goButtonTo}> button Go To</button>
        <p> last hashData:${JSON.stringify(hashRouter.lastHashData)}</p>
        <p> hashData:${JSON.stringify(hashRouter.currentHashData)}</p>
        <a href="/" @click=${this.clickGoTo}>/</a>

        <p-router-link .src=${'/user/list/1000'} .data=${{id:1,name:'test'}} > userId=1000  </p-router-link> <br/>
        <p-router-link .src=${'/user/list/:id'} .data=${{id:1010,name:'test'}} > userID=1010 </p-router-link> <br/>
        <p-router-link .src=${'/user/list/:id'} .data=${{id:1200,name:'test'}} > userID=1200 </p-router-link> <br/>
        <p-router-link .src=${'/user/listList/1000'}  > /user/listList/1000</p-router-link> <br/>
        
        <a href="/user/listList/a1000" @click=${this.clickGoTo}> :a1000</a>
        
    `
  }
  private goButtonTo(){
    var d=this.jsonData?JSON.parse(this.jsonData):undefined;
    hashRouter.toHashPath(this.url,d);
  }
  private clickGoTo(event:Event){
    event.preventDefault();
    var href=(event.target as any).getAttribute('href');
    hashRouter.toHashPath(href);
  }
  
}

declare global {
  interface HTMLElementTagNameMap {
    'my-user-list': MyUserList
  }
}
