const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/dist/index.html`,
  filename: "index.html",
  inject: "body",
});

module.exports = {
  entry: {
    index: ["babel-polyfill", "./src/index.js"],
    // app: ['babel-polyfill',"./src/index.js"],
    // index: "./src/index.js",
  },
  watch: true,
  devtool:"",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/static"),
    publicPath: "/static/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["url-loader?limit=10000", "img-loader"],
      },
      {
        test: /\.mp4$/,
        use: "file-loader?name=videos/[name].[ext]",
      },
    ],
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  resolve: {
    extensions: [".js"],
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/static/",
    historyApiFallback: true,
    watchContentBase: true,
  },
  plugins: [HTMLWebpackPluginConfig,],
  mode: "production",
};
