simpleDatatables.DataTable.extend("u", function(options) {
    let instance = this;
    let wrapper = instance.wrapper.classList
    let container = instance.container.classList
    let table = instance.table.classList
    let bottom = instance.wrapper.querySelector(".dataTable-bottom").classList
    let init = document.querySelector("#dataTableEmpty").classList
    let info = document.querySelector(".dataTable-info").classList
    
    let u = function() {};
    u.prototype.init = function() {};
    u.prototype.clear = function() {
        instance.clear()
        instance.data = []
        wrapper.add('d-block-important', 'spinner')
        container.add('shade')
        bottom.add('d-none')
        init.add('d-none')
        info.add('d-none')
    };
    u.prototype.noFacets = function() {
        init.remove('d-none')
        wrapper.remove('d-block-important', 'spinner')
        container.remove('shade')
    }
    u.prototype.refresh = function(data) {
        if (data.length > 0) {
            instance.insert({data:data})
        } else { 
            instance.insert({data:[[]]})
            instance.rows().remove(0)
        }
        table.remove('d-none')
        container.remove('shade')
        wrapper.remove('spinner')
        wrapper.add('d-block-important')
        bottom.remove('d-none')
        init.add('d-none')
        info.remove('d-none')
    }
    return new u;
})