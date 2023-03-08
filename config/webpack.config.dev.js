const path = require("path");
const webpack = require("webpack");

const { getProxy, getMessage } = require("./proxy");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const sass = require("sass");

module.exports = {
    mode: "development",
    target: "web",
    devtool: "cheap-module-source-map",

    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    entry: {
        app: "./src/index",
    },
    output: {
        publicPath: "/",
        filename: "static/js/[name].[hash].js",
        chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    },

    devServer: {
        publicPath: "/",
        contentBase: "./public",
        hot: true,
        historyApiFallback: true,
        open: true,
        noInfo: false,
        port: 3010,
        proxy: getProxy(),
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        alias: {
            "~": path.resolve("src"),
            "@components": path.resolve("src/components"),
            "@stores": path.resolve("src/stores"),
            "@containers": path.resolve("src/containers"),
            "@hooks": path.resolve("src/hooks"),
            "@helpers": path.resolve("src/helpers"),
            "@api": path.resolve("src/api"),
            "@layouts": path.resolve("src/Layouts"),
            "@selectors": path.resolve("src/selectors"),
            "@constants": path.resolve("src/constants"),
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },

            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "ts-loader"],
            },

            {
                test: /\.(css)$/,
                exclude: /node_modules\/(?!(@tippyjs|tippy.js)\/).*/,

                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            // Prefer `dart-sass`
                            implementation: sass,
                        },
                    },
                ],
            },

            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [{ loader: "@svgr/webpack" }, { loader: "url-loader" }],
            },

            {
                test: /\.(jpe?g|png|gif)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images",
                        },
                    },
                ],
            },

            {
                test: /\.(woff2|ttf|woff|eot|otf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "fonts",
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new CaseSensitivePathsPlugin(),
        new ProgressBarPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/",
                    to: "dist/[name].[contenthash][ext]",
                    toType: "template",
                },
            ],
        }),
        // new webpack.DefinePlugin({
        //     "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        // }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve("public/index.html"),
            filename: "index.html",
            hash: true,
        }),
        new ErrorOverlayPlugin(),
        new WebpackShellPluginNext({
            onBuildStart:{
                scripts: ['echo "Webpack Start"'],
                blocking: true,
                parallel: false
            },
            onBuildEnd:{
                scripts: [`echo ${getMessage()}`],
                blocking: false,
                parallel: true
            }
        }),
        // new WebpackShellPluginNext({ onBuildEnd: [`echo ${getMessage()}`] }),
        // new UnusedFilesWebpackPlugin({ failOnUnused: false, patterns: ["src/**/*.*"] }),
    ],
};
