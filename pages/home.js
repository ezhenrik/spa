import { LitElement, html } from 'lit-element';

class Home extends LitElement {
    render() {
        return html`
            <span>Home</span>
        `
    }
    createRenderRoot() {
        return this;
    }
}
customElements.define('page-home', Home);