import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: true,
      output: {
        distPath: {
          root: './dist/es',
        },
      },
    },
    {
      format: 'umd',
      umdName: 'MpegtsPlugin',
      output: {
        externals: {
          xgplayer: 'Player',
          'mpegts.js': 'mpegts',
        },
        distPath: {
          root: './dist/umd',
        },
      },
    },
  ],
});
