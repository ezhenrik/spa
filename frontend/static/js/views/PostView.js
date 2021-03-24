import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Post");

        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(res => {
                document.querySelector("#fetch").innerHTML = res.data[1]['email']
            });
        }

    async getHtml() {
        return `
            <h1>Post</h1>
            <p>You are viewing post #${this.postId}.</p>

            <p id="fetch">nj</p>
        `;
    }
}
