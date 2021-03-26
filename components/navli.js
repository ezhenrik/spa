import { LitElement, html, css } from 'lit-element';
import { RouteMixin } from 'simple-wc-router'; 

class Navli extends RouteMixin(LitElement) {
    static get properties() {
        return {
           route: String,
           disabled: Boolean,
           linkText: String
        }
    }
    handleClick(e) {
        e.preventDefault()
        this.navigate();
    }
    render() {
        const activeClass = this.isRouteActive ? 'active' : '';
        const clickHandler = this.handleClick.bind(this);
        return html`
            <li class="nav-item">
                <a href="#" class="nav-link ${activeClass}" @click="${clickHandler}">${this.linkText}</a>
            </li>
        `;
    }    
    createRenderRoot() {
        return this;
      }
}
customElements.define('w-nav', Navli);