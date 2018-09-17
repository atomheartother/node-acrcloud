var fetch = require('node-fetch');
var config = require('./config');
var sign = require('./sign');
var helper = require('./helper');

var buckets = module.exports = {};
var endpoint = '/v1/buckets';

buckets.add = (name, type, scale, content_type, region = config.default_region) => {
    let headers = helper.makeHeader('POST', endpoint);
    let data = {
        name,
        type,
        scale,
        content_type,
        region
    };
    return fetch(`https://${config.api_host}${endpoint}`, {
        method : 'POST',
        headers : headers,
        body : helper.makeForm(data),
    }).then(response => response.json());
}

buckets.get = (per_page = 50) => {
    let headers = helper.makeHeader('GET', endpoint);

    return fetch(`https://${config.api_host}${endpoint}?per_page=${per_page}`, {
        headers : headers,
    }).then(response => response.json());
}

buckets.delete = (name) => {
    let headers = helper.makeHeader('DELETE', `${endpoint}/${name}`);
    return fetch(`https://${config.api_host}${endpoint}/${name}`, {
        method: 'DELETE',
        headers: headers,
    });
}