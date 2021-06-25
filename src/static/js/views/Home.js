import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
        this.logo = require("url:../../img/papygreeklogo.jpg")
        this.erc = require("url:../../img/erc.png")
        this.hy = require("url:../../img/hy.png")
        
    }
    getHtml() {
        return `
            <section class="g-8">
                <h1>PapyGreek</h1>
                <h2>Digital Grammar of Documentary Papyri</h2>
                
                <div class="grid" style="margin-top:30px;">
                    <div class="g-6 text-center">
                        <p><img style="width:100%" src="${this.erc}"/></p>
                    </div>
                    <div class="g-6 text-center">
                        <p><img style="width:48%" src="${this.hy}"/></p>
                    </div>
                </div>
                <p>This project has received funding from the European Research Council (ERC) under the European Union’s Horizon 2020 research and innovation programme (grant agreement No 758481).</p> 
            </section>
            <aside>
                <img id="logo" src="${this.logo}"/>
            </aside>
        `;
    }
}