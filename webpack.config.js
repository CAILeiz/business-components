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
    devtool: "inline-source-map",
    devServer: {
      headers: {
        "Cache-Control": "no-store",
      },
      static: "./dist",
      hot: true, // 启用热模块替换
      open: true, // 自动打开浏览器
    },
    watchOptions: {
      ignored: /node_modules/, // 忽略 node_modules
      poll: 1000, // 轮询间隔（适用于虚拟机或 Docker 环境）
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader", // 将 CSS 注入到页面
            "css-loader", // 解析 CSS 文件
            "postcss-loader", // 添加 PostCSS
          ],
        },
        {
          test: /\.vue$/i,
          use: "vue-loader",
        },
        {
          test: /\.less$/i,
          use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
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
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/], // 让 ts-loader 处理 .vue 文件中的 TypeScript
          },
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
