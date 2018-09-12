# node-acrcloud
node.js wrapper for the ACRCloud WebAPI. Currently a WIP, will cover the entire API when done.

```js
var ACRCloud = require('node-acrcloud');
const fs = require('fs');

var acr = ACRCloud('host','access_key', 'access_secret');

const sample = fs.readFileSync("./file01.mp3");

// Identify a file
acr.identify(sample)
.then(metadata => {
    console.log(metadata);
});
```

# Features
## Done
- Audio file identification

## Done, not tested
- Fingerprints support

## TODO
- Monitoring API
- Audios
- Channels
- Buckets
- Projects
- Monitors
- Channel-Playback