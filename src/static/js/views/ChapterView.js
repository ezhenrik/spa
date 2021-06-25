import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.chapterId = params.id;
        this.setTitle("Viewing chapter");
    }

    getHtml() {
        return `
            <h1>Chapter</h1>
            <p>You are viewing chapter #${this.chapterId}.</p>
        `;
    }
}
