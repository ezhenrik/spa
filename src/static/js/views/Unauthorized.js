import AbstractView from "./AbstractView.js";

export default class extends AbstractView { 
    constructor(params) {
        super(params);
        this.setTitle("Unauthorized");   
    }

    getHtml() {
        return `
            You are not authorized to access this page.
        `;
    }
}