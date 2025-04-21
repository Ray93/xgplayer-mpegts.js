# xgplayer-mpegts.js

[![NPM downloads](https://img.shields.io/npm/dm/xgplayer-mpegts.js)](https://www.npmjs.com/package/xgplayer-mpegts.js)
[![Latest Stable Version](https://img.shields.io/npm/v/xgplayer-mpegts.js)](https://www.npmjs.com/package/xgplayer-mpegts.js) 

[English](README.md)

基于[xgplayer](https://github.com/bytedance/xgplayer)集成[mpegts.js](https://github.com/xqq/mpegts.js)的扩展插件。

部分代码参考自[xgplayer-flv.js](https://github.com/bytedance/xgplayer/tree/main/packages/xgplayer-flv.js)。

## 使用方法

### 安装

```shell
$ npm install xgplayer
$ npm install xgplayer-mpegts.js
```

### 使用方式

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
  } as MpegtsPluginConfig, // MpegtsPlugin插件的配置
  // 如果使用CDN加载，可以通过window.MpegtsPlugin获取插件
});
```

### 获取mpegts实例

```js
const mpegtsInstance = player.__mpegts__;
// 或者
const mpegtsInstance = player.plugins.mpegtsplugin.mpegts;
```

### 直播追帧配置
具体配置参考[mpegts官方文档](https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtscreateplayer)

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