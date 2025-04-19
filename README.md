# xgplayer-mpegts.js

[![NPM downloads](https://img.shields.io/npm/dm/xgplayer-mpegts.js)](https://www.npmjs.com/package/xgplayer-mpegts.js)
[![Latest Stable Version](https://img.shields.io/npm/v/xgplayer-mpegts.js)](https://www.npmjs.com/package/xgplayer-mpegts.js)  
A extension plugin which integrated [mpegts.js](https://github.com/xqq/mpegts.js) based on xgplayer.

Some code references are taken from [xgplayer-flv.js](https://github.com/bytedance/xgplayer/tree/main/packages/xgplayer-flv.js).

## How to use

### install

```shell
$ npm istall xgplayer
$ npm istall xgplayer-mpegts.js
```

### Usage

html

```html
<div id="vs"></div>
```

js

```javascript
import Player from 'xgplayer';
import 'xgplayer/dist/xgplayer.min.css';
import MpegtsPlugin from 'xgplayer-mpegts.js';

const player = new Player({
  id: 'vs',
  url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv',
  plugins: [MpegtsPlugin],
  MpegtsPlugin: {
    mediaDataSource: { type: 'flv' },
    mpegtsConfig: {},
  }, // config for plugin MpegtsPlugin
  // If use CDN loading,you can Get the plugin through window.MpegtsPlugin
});
```
