# xgplayer-mpegts.js
[![NPM downloads](https://img.shields.io/npm/dm/xgplayer-mpegts.js)](https://www.npmjs.com/package/xgplayer-mpegts.js)
[![Latest Stable Version](https://img.shields.io/npm/v/xgplayer-mpegts.js)](https://www.npmjs.com/package/xgplayer-mpegts.js)  

[中文](README_zh.md)

A extension plugin which integrated [mpegts.js](https://github.com/xqq/mpegts.js) based on [xgplayer](https://github.com/bytedance/xgplayer).

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

```js
import Player from "xgplayer";
import "xgplayer/dist/xgplayer.min.css";
import MpegtsPlugin, { type MpegtsPluginConfig } from "xgplayer-mpegts.js";

const player = new Player({
  id: "vs",
  url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv",
  plugins: [MpegtsPlugin],
  MpegtsPlugin: {
    mediaDataSource: { type: "flv" },
    mpegtsConfig: {},
  } as MpegtsPluginConfig, // config for plugin MpegtsPlugin
  // If use CDN loading,you can Get the plugin through window.MpegtsPlugin
});
```

### Get the `mpegts` instance

```js
const mpegtsInstance = player.__mpegts__;
// or
const mpegtsInstance = player.plugins.mpegtsplugin.mpegts;
```

### Live stream frame-chasing configuration
For specific configurations, refer to the [mpegts official documentation](https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtscreateplayer)

```js
const player = new Player({
  id: "vs",
  url: "",
  isLive: true,
  plugins: [MpegtsPlugin],
  MpegtsPlugin: {
    mediaDataSource: { type: "flv" },
    mpegtsConfig: { liveBufferLatencyChasing: true, liveSync: true },
  } as MpegtsPluginConfig,
```
