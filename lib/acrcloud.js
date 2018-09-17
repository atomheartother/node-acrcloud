var config = require('./config');

// Options:
// - signature_version (default: 1)
// - identify_host (default: identify-eu-west-1.acrcloud.com)
// - default_region (default: eu-west-1)
// - api_host (default: api.acrcloud.com)
module.exports = (account_access_key, account_access_secret, options={}) => {
    config.access_key = account_access_key;
    config.access_secret = account_access_secret;
    Object.keys(options).forEach(key => {
        if (config.hasOwnProperty(key)) {
            config[key] = options[key];
        }
        else {
            console.error("Invalid option: " + key);
        }
    });
    var ACR = {};
    ACR.config = config;
    ACR.identify = require('./identify');
    ACR.buckets = require('./buckets');
    return ACR;
}