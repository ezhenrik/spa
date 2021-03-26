import { LitElement, html } from 'lit-element';

class First extends LitElement {
    render() {
        return html`
            <span>moi</span>
        `
    }
    createRenderRoot() {
        return this;
    }
}
customElements.define('first-page', First);