import { LitElement, html } from 'lit-element';

class First extends LitElement {
    render() {
        return html`
            <span>first</span>
        `
    }
    createRenderRoot() {
        return this;
    }
}
customElements.define('page-first', First);