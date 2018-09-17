var config = require('./config');
var sign = require('./sign');
var fetch = require('node-fetch');
var helper = require('./helper');

var endpoint = '/v1/identify';

// Possible options:
// - fingerprint: bool, true if the file is a fingerprint file.
// - audio_format: The format of your audio data, like "mp3, wav, ma4, pcm, amr" etc, If your audio file does not have audio header, this parameter should be included
// - sample_rate: If your audio file does not have audio header, this parameter should be included
// - audio_channels: If your audio file does not have audio header, this parameter should be included. Allowed values: 1,2
module.exports = (sample, keys = {'access_key' : null, 'access_secret' : null}, options = {}) => {
    let fingerprint = !!(options.fingerprint);
    let file = Buffer.from(fileArray);
    let timestamp = new Date().getTime() / 1000;
    let data_type = fingerprint ? "fingerprint" : "audio";
    let signature = sign.identify('POST', endpoint, data_type, timestamp, keys);
    let data = {
        'access_key' : keys.access_key,
        data_type,
        sample,
        'sample_bytes' : file.length,
        'signature_version' : config.signature_version,
        signature,
        timestamp,
    };
    if (!fingerprint) {
        if (options.audio_format)
            data.audio_format = options.audio_format;
        if (options.sample_rate)
            data.sample_rate = options.sample_rate;
        if (options.audio_channels)
            data.audio_channels = options.audio_channels;
    }
    return fetch(`https://${config.identify_host}${endpoint}`, {
        'method': "POST",
        'body' : helper.makeForm(data),
    }).then(response => response.json());
}