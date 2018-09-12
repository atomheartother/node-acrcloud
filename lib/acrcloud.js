var config = require('./config');

module.exports = (host, access_key, access_secret, options={}) => {
    config.host = host;
    config.access_key = access_key;
    config.access_secret = access_secret;
    if (options.signature_version)
        config.signature_version = options.signature_version;
    var ACR = {};
    ACR.identify = require('./identify');
    return ACR;
}