import AbstractView from "./AbstractView.js";

export default class extends AbstractView { 
    constructor(params) {
        super(params);
        this.setTitle("Bye");   
    }

    getHtml() {
        return `
            You have been logged out.
        `;
    }
}