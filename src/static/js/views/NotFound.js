import AbstractView from "./AbstractView.js";

export default class extends AbstractView { 
    constructor(params) {
        super(params);
        this.setTitle("Page not found");   
    }

    getHtml() {
        return `
            Page not found.
        `;
    }
}