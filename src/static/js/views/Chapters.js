import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    getHtml() {
        console.log(this.siteMap)
        
        let chapters = this.siteMap.filter(item => item.indexOf('/') == -1)
        console.log(chapters)
        return `
            <h1>Chapters</h1>

            ${Object.keys(chapters).map(function (key) {
                return "<p><a data-link href='chapters/" + key + "'>" + chapters[key] + "</a></p>"           
            }).join("")}
        `;
    }
}