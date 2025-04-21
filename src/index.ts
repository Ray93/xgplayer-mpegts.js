import { BasePlugin, Events } from "xgplayer";
import Mpegts from "mpegts.js";

export interface MpegtsPluginConfig {
  mediaDataSource: Mpegts.MediaDataSource;
  mpegtsConfig: Mpegts.Config;
}

class MpegtsPlugin extends BasePlugin {
  mpegts: Mpegts.Player | null = null;

  static get isSupported() {
    return Mpegts.isSupported;
  }

  static get pluginName() {
    return "MpegtsPlugin";
  }

  static get defaultConfig(): MpegtsPluginConfig {
    return {
      mediaDataSource: { type: "flv" },
      mpegtsConfig: {},
    };
  }

  beforePlayerInit() {
    const { url } = this.playerConfig;
    if (url) {
      this.mpegtsLoad(url as string);
    }
  }

  afterCreate() {
    const { player, playerConfig } = this;
    const media = player.media as HTMLVideoElement;
    this.mpegts = null;

    media.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    this.on(Events.URL_CHANGE, (url: string) => {
      if (url.startsWith("blob")) return;
      playerConfig.url = url;
      this.mpegtsLoad(url);
    });

    BasePlugin.defineGetterOrSetter(player, {
      url: { get: () => media.src, configurable: true },
      /** 原始url */
      __url: { get: () => playerConfig.url },
      /** 给player注册__mpegts__属性，方便外部访问mpegts实例 */
      __mpegts__: { get: () => this.mpegts },
    });
  }

  destroy() {
    if (!this.mpegts) return;
    this.mpegts.unload();
    this.mpegts.detachMediaElement();
    this.mpegts.destroy();
    this.mpegts = null;
  }

  createInstance(mpegts: Mpegts.Player) {
    if (!mpegts) return;
    const { player, playerConfig } = this;
    const media = player.media as HTMLVideoElement;
    mpegts.attachMediaElement(media);
    mpegts.load();

    if (playerConfig.autoplay) {
      mpegts.play();
    }

    mpegts.on(Mpegts.Events.ERROR, (e) => {
      player.emit("mpegts_error", `mpegts_error: ${e}, url: ${player.url}`);
    });
    mpegts.on(Mpegts.Events.STATISTICS_INFO, (data) => {
      player.emit("statistics_info", data);
    });
    mpegts.on(Mpegts.Events.MEDIA_INFO, (data) => {
      player.emit("MEDIA_INFO", data);
    });
  }

  mpegtsLoad(url: string) {
    const { mediaDataSource, mpegtsConfig } = this.config as MpegtsPluginConfig;
    mediaDataSource.url = url;
    mediaDataSource.isLive = this.playerConfig.isLive;
    mediaDataSource.segments = undefined;

    if (typeof this.mpegts !== "undefined") {
      this.destroy();
    }
    this.mpegts = Mpegts.createPlayer(mediaDataSource, mpegtsConfig);
    this.createInstance(this.mpegts);
  }
}

export { Mpegts };

export default MpegtsPlugin;
