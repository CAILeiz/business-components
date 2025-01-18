const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = function (env) {
  console.log("env", env);
  return {
    mode: "development",
    entry: {
      main: "./src/main.ts",
    },
    output: {
      filename: "[name].[contenthash].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      library: {
        name: "BusinessComponents",
        type: "umd",
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        Comps: path.resolve(__dirname, "src/components"),
        Utils: path.resolve(__dirname, "src/utils"),
      },
      extensions: [".js", ".ts", ".vue", ".json"], // 添加需要解析的扩展名
    },
    externals: {
      lodash: {
        commonjs: "lodash",
        commonjs2: "lodash",
        amd: "lodash",
        root: "_",
      },
    },
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
    },
    module: {
      rules: [
        {
          test: /\.vue$/i,
          use: "vue-loader",
        },
        {
          test: /\.less$/i,
          use: ["style-loader", "css-loader", "less-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              targets: "defaults",
              presets: [["@babel/preset-env"]],
            },
          },
        },
        {
          test: /\.ts$/i,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "business-components",
      }),
      new VueLoaderPlugin(), // 必须添加这个插件
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
