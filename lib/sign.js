var config = require('./config');
var crypto = require('crypto');

// Takes method and URI & returns a valid signature
if (config.signature_version == 1)
    module.exports =  signv1;
else {
    console.error("The signature version you entered isn't supported yet: " + config.signature_version);
    module.exports = undefined;
}

function signv1(method, uri, dataType, timestamp) {
    let str = [method, uri, config.access_key, dataType, config.signature_version, timestamp].join('\n');
    return crypto.createHmac('sha1', config.access_secret).update(str, "utf8").digest().toString('base64');
}