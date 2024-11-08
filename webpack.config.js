const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
            },
          },
          "url-loader",
        ],
      },
    ],
  },
};
