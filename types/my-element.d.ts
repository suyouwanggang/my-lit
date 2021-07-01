import { LitElement } from 'lit-element';
import { BeforeEnterObserver, PreventAndRedirectCommands, RouterLocation, Router } from '@vaadin/router';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export default class MyElement extends LitElement implements BeforeEnterObserver {
    static styles: import("lit-element").CSSResult;
    onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands, router: Router): void;
    /**
     * The name to say "Hello" to.
     */
    name: string;
    /**
     * The number of times the button has been clicked.
     */
    count: number;
    render(): import("lit-element").TemplateResult;
    private _onClick;
    foo(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
