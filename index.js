import { LitElement, html } from 'lit-element';
import { Router } from 'simple-wc-router';
import './pages/home.js';
import './components/navli.js';

const globalProp = "version-1.2.3";

class App extends Router(LitElement) {
    static get routes() {
        return [
            // Root path
            {
                path: "/",
                component: "page-home"
            },
            // Using 'type' and 'day' variable.
            {
                path: "/first",
                component: "page-first",
                import: () => import("./pages/first.js")
            },
            // Fallback for all unmatched routes.  
            {
                path: "*",
                render: () => html`<h2>404 The requested page could not be found</h2>`
            }
        ];
    }

    render() {
        return html`

        <nav class="navbar navbar-expand navbar-light">
            <ul class="navbar-nav me-auto">
                <w-nav route="/" linkText="Home"></w-nav>
                <w-nav route="/first" linkText="First"></w-nav>
                <w-nav route="/second" linkText="Second"></w-nav>
            </ul>
            <ul class="navbar-nav">
                <w-nav route="/login" linkText="Second"></w-nav>
            </ul>
        </nav>
        <main>
            ${this.routeElement}
        </main>
        <footer>
            Footer
        </footer>
        `
    }
    createRenderRoot() {
        return this;
    }
}
customElements.define('my-app', App);