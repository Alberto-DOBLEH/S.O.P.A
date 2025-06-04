const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        fs: false,
        zlib: false,
        net: false,
        tls: false,
        assert: require.resolve("assert"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        buffer: require.resolve("buffer"),
        querystring: require.resolve("querystring-es3"),
        events: require.resolve("events"),
      };
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        }),
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
      ];
      return webpackConfig;
    },
  },
};
