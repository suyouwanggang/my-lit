import { LitElement } from 'lit-element';
export default class MyUserList extends LitElement {
    /**
     * The name to say "Hello" to.
     */
    location?: string;
    url: string;
    userID?: string;
    private jsonData;
    constructor();
    firstUpdated(map: any): void;
    disconnectedCallback(): void;
    render(): import("lit-element").TemplateResult;
    private clickGoTo;
    private goButtonTo;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-user-list': MyUserList;
    }
}
