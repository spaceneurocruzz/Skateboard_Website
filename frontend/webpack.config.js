const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/dist/index.html`,
  filename: "index.html",
  inject: "body",
});

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  watch: true,
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/static"),
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
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    hot: true,
  },
  plugins: [HTMLWebpackPluginConfig],
  mode: "development",
};
