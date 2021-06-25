import AbstractView from "./AbstractView.js";
import get from "../api.js"
import {debounce} from "../functions.js"
import {annotation_statuses as stat} from "../config.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Texts");
        this.radioTimer = null;
    }

    updateLocation() {
        const params = new URLSearchParams();
        for (const [key, val] of Object.entries(this.query)) {
            params.set(key, val);
        }
        history.pushState(null, null, `${location.pathname}?${params.toString()}`);
        this.queryString = window.location.search;
    }

    insideDebounce(e, view) {
        let val = e.target.value.trim()
        let what = e.target.getAttribute('name')
        if (val) {
            view.query[what] = val
        } else {
            delete view.query[what]
        }

        view.updateLocation()
        view.getTexts()
    }

    facetInit() {
        let view = this
        Object.keys(view.query).map(function (key) {
            if (key == 'series.name') {
                document.getElementById("series_name").value = view.query[key]
            }  else if (key == 'treebank__orig_status') {
                document.getElementById(`orig${view.query[key]}`).checked = true
            }  else if (key == 'treebank__reg_status') {
                document.getElementById(`reg${view.query[key]}`).checked = true
            }     
        }).join("")

        document.querySelectorAll('.facet').forEach(el => {
            el.addEventListener('keydown', debounce(function(e) {
                view.insideDebounce(e, view)
            }, 400), false)
        });

        document.querySelectorAll('input[type="radio"]').forEach((elem) => {
            /*
            elem.addEventListener('change', debounce(function(e) {
                view.insideDebounce(e, view)
            }, 100), false);
            */
            elem.addEventListener('change', function(e) {
                clearTimeout(view.radioTimer);
                view.radioTimer = setTimeout(function(){
                    view.insideDebounce(e, view)
                }, 400);
            });
        });

    }

    dataTableInit() {
        this.dataTable = new simpleDatatables.DataTable("#datatable", {
            plugins: {
                u: {enabled: true},
            },
            perPage: 100,
            perPageSelect: false,
            data: {
                'headings': ['Document', 'Series', 'Date >', 'Date <', 'Place', 'Orig. status', 'Reg. status'],
            },
            columns: [
                {
                    select: 0,
                    render: function(data, cell, row) {
                        return `<a data-link href='/document/${data.split('|')[0]}'>${data.split('|')[1]}</a>`
                    }
                },
                {
                    select: 1,
                    render: function(data, cell, row) {
                        return `<span data-filter='series_id=${data.split('|')[0]}'>${data.split('|')[1]}</span>`
                    }
                },
                {
                    select: 5,
                    render: function(data, cell, row) {
                        return `<span data-filter='text_reg_status=${data.split('|')[0]}'>${data.split('|')[1]}</span>`
                    }
                },
                {
                    select: 6,
                    render: function(data, cell, row) {
                        return `<span data-filter='text_orig_status=${data.split('|')[0]}'>${data.split('|')[1]}</span>`
                    }
                }
            ],
            layout: {
                top: "{info}{search}",
                bottom: "{pager}"
            },
            labels: {
                placeholder: "Filter results...",
                perPage: "{select} entries per page",
                noRows: "No texts found",
                info: "{rows} texts",
            }
        })
    }
    getTexts() {
        if (Object.keys(this.query).length === 0) {
            this.dt().noFacets()
            return
        } else if ((this.query['treebank__orig_status'] == 'null' || this.query['treebank__reg_status'] == 'null' ) &&  (!('series.name' in this.query) || this.query['series_name'].trim() == '')) {
            this.dt().noFacets()
            return
        }

        this.dt().clear()

        get(`/texts/${this.queryString}&_s=text.id,text.place_name,text.date_not_before,text.date_not_after,text.name,text.place_name,series.name,series.id,text.id,treebank.orig_status,treebank.reg_status,treebank.id&_j=series|text,treebank|!text&_w=newest_treebank`)
            .then((val) => {
            let data = val.map(item => {
                let orig_status = item.treebank_orig_status || 0
                let reg_status = item.treebank_reg_status || 0
                return [
                    `${item.text_id}|${item.text_name}`, 
                    `${item.series_id}|${item.series_name}`, 
                    `${item.text_date_not_before || ''}`,
                    `${item.text_date_not_after || ''}`,
                    `${item.text_place_name || ''}`,
                    `${orig_status}|${stat[orig_status]}`, 
                    `${reg_status}|${stat[reg_status]}`, 
                ] 
            })
            this.dt().refresh(data)
        })
    }

    getHtml() {
        return `
            <h1>Texts</h1>
            <aside>
                <h3>Series</h3>
                <input onClick="this.select();"  class="facet" id="series_name" name="series.name" style="width:120px;" type="text"/>
                <h3>Original status</h3>
                <input checked type="radio" id="orig" name="treebank__orig_status" value="">
                <label for="orig">Any</label><br>
                <input type="radio" id="orig3" name="treebank__orig_status" value="3">
                <label for="orig3">${stat[3]}</label><br>
                <input type="radio" id="orig4" name="treebank__orig_status" value="4">
                <label for="orig4">${stat[4]}</label><br>
                <input type="radio" id="orig2" name="treebank__orig_status" value="2">
                <label for="orig2">${stat[2]}</label><br>
                <input type="radio" id="orig8" name="treebank__orig_status" value="8">
                <label for="orig8">${stat[8]}</label><br>
                <input type="radio" id="orignull" name="treebank__orig_status" value="null">
                <label for="orignull">${stat['null']}</label><br>
                <h3>Regularized status</h3>
                <input checked type="radio" id="reg" name="treebank__reg_status" value="">
                <label for="reg">Any</label><br>
                <input type="radio" id="reg3" name="treebank__reg_status" value="3">
                <label for="reg3">${stat[3]}</label><br>
                <input type="radio" id="reg4" name="treebank__reg_status" value="4">
                <label for="reg4">${stat[4]}</label><br>
                <input type="radio" id="reg2" name="treebank__reg_status" value="2">
                <label for="reg2">${stat[2]}</label><br>
                <input type="radio" id="reg8" name="treebank__reg_status" value="8">
                <label for="reg8">${stat[8]}</label><br>
                <input type="radio" id="regnull" name="treebank__reg_status" value="null">
                <label for="regnull">${stat['null']}</label><br>
            </aside>
            <section>
                <div id="dataTableEmpty">
                    <p>Search for texts using the filters on the left.</p>
                    <p>If you choose "any" or "not annotated" status, the series must be specified</p>
                </div>
                <table id="datatable" class="d-none texts-datatable"></table>
            </section>
        `;
    }

    afterRender() {
        this.dataTableInit()
        this.facetInit()
        this.dt().clear()
        this.getTexts()
    }
}