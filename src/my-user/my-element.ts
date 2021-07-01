import { LitElement, html, customElement, property, css } from 'lit-element'
import imgURL from '../assets/logo.png';
import hashRouter  from '../router-helper/hash.Router';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export default class MyElement extends LitElement  {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `
  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0
  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <img src='${imgURL}'/>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `
  }

  private _onClick() {
    this.count++;
    hashRouter.toHashPath('/user/list/2',{id:Math.random()})
  }

  foo(): string {
    return 'foo'
  }
}

declare global {
  interface HTMLElementTagNameMap{
    'my-element': MyElement
  }
}
