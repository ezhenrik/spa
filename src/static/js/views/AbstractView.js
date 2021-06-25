export default class {
    constructor(params) {
        this.params = params;
        this.queryString = window.location.search;
        this.query = Object.fromEntries(new URLSearchParams(this.queryString));
        this.data = null;
        this.user = null;
        this.dataTable = null;
    }

    dt() {
        if (typeof this.dataTable.u == 'object') {
            return this.dataTable.u
        } else {
            return this.dataTable.u()
        }
    }

    setTitle(title) {
        document.title = `${process.env.TITLE} – ${title}`
    }

    getHtml() {
        return '';
    }

    afterRender() {}
}