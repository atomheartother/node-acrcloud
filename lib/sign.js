var config = require('./config');
var crypto = require('crypto');

var sign = module.exports = {};

sign.console = (method, uri, timestamp) => {
    var str = [method, uri, config.access_key, 1, timestamp].join('\n');
    return crypto.createHmac('sha1', config.access_secret).update(str, "utf8").digest().toString('base64');
}

sign.identify = (method, uri, dataType, timestamp, keys) => {
    var str = [method, uri, keys.access_key, dataType, 1, timestamp].join('\n');
    return crypto.createHmac('sha1', keys.access_secret).update(str, "utf8").digest().toString('base64');
}
