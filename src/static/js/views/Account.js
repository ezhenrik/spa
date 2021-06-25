import AbstractView from "./AbstractView.js";


export default class extends AbstractView { 
    constructor(params) {
        super(params);
        this.setTitle("Account");   
    }

    getHtml() {

        return `
            <h1>Account</h1>
            <p>Name: ${this.user.name} </p>
            <p>Email: ${this.user.email} </p>
            <p><a href="#" logout>Logout</a> </p>  
        `;
    }
}