const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const sass = require("sass");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: "production",
    target: "web",
    devtool: 'nosources-source-map',
    bail: true,
    entry: {
        app: ["./src/index"],
    },
    performance: {
        hints: false
    },
    output: {
        publicPath: "/",
        path: path.resolve("build"),
        filename: "js/[name].[chunkhash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].js",
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(
            {
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    // Deprecated
                    output: null,
                    format: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            }
        )],
    },

    resolve: {
        extensions: ["*", ".js", ".jsx"],
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
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: false,
                        },
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
                use: [
                    { loader: "@svgr/webpack" },

                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images",
                            name: "[hash].[ext]?[hash]",
                        },
                    },
                ],
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
                            name: `[name].[ext]`,
                            outputPath: "fonts",
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new ProgressBarPlugin(),
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: "body",
            template: "public/index.html",
            filename: "index.html",
            minify: true
        }),
    ],
};
