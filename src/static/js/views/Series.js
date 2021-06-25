import AbstractView from "./AbstractView.js";
import get from "../api.js"
import {debounce} from "../functions.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Series");
        this.state = {
            type: 'documentary',
        }
    }

    seriesSelectorInit() {
        let view = this
        document.querySelectorAll('input[name="type"]').forEach((elem) => {
            elem.addEventListener('change', debounce(function(e) {
                var item = e.target.value;
                view.state.type = item
                view.dt().clear()
                view.getSeries()
            }, 100), false);
        });
    }

    dataTableInit() {
        this.dataTable = new simpleDatatables.DataTable("#datatable", {
            plugins: {
                u: {enabled: true},
            },
            perPage: 10000,
            data: {
                'headings': ['Name', 'Type', 'Documents'],
            },
            columns: [
                {
                    select: 0,
                    render: function(data, cell, row) {
                        return `<a data-link href='/texts?series.name=${data.split('|')[1]}'>${data.split('|')[1]}</a>`
                    }
                },
            ],
            layout: {
                top: "{info}{search}",
                bottom: ""
            },
            labels: {
                placeholder: "Filter results...",
                perPage: "{select} entries per page",
                noRows: "No series found",
                info: "{rows} series",
            }
        })
    }

    getSeries() {
        let state = this.state.type == 'all' ? '' : `series.type=${this.state.type}&`
        let series = get(`/series/?${state}_s=count_documents,series.id,series.type,series.name`)
        series.then((val) => {
            let data = val.map(item => {
                return [
                    `${item.series_id}|${item.series_name}`, 
                    `${item.series_type}`, 
                    `${item.text_count}`,
                ] 
            })
            this.dt().refresh(data)
        })
    }

    getHtml() {
        return `
            <h1>Series</h1>
            <aside>
                <h3>Type</h3>
                <input checked type="radio" id="documentary" name="type" value="documentary">
                <label for="documentary">Documentary papyri</label><br>
                <input type="radio" id="literary" name="type" value="literary">
                <label for="literary">Literary papyri</label><br>
                <input type="radio" id="inscriptions" name="type" value="inscriptions">
                <label for="inscriptions">Inscriptions</label><br>
                <input type="radio" id="all" name="type" value="all">
                <label for="all">All</label>
            </aside>
            <section>
                <div id="dataTableEmpty"></div>
                <table id="datatable" class="d-none series-datatable"></table>
            </section>
        `;
    }

    afterRender() {
        this.dataTableInit()
        this.seriesSelectorInit()
        this.dt().clear()
        this.getSeries()
    }
}