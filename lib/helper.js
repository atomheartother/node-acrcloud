var FormData = require('form-data');
let helper = module.exports = {}

helper.makeForm = (object) => {
    let form = new FormData();
    Object.keys(object).forEach(key => {
        form.append(key, object[key]);
    });
    return form;
} 