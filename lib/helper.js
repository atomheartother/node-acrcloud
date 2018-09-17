var FormData = require('form-data');
var config = require('./config');
var sign = require('./sign');

module.exports.makeForm = object => {
    let form = new FormData();
    Object.keys(object).forEach(key => {
        form.append(key, object[key]);
    });
    return form;
}

module.exports.makeHeader = (method, endpoint) => {
    let timestamp = new Date().getTime() / 1000;
    return {
        'access-key' : config.access_key,
        'signature-version' : config.signature_version,
        'signature' : sign.console(method, endpoint, timestamp),
        'timestamp' : timestamp
    };
}
