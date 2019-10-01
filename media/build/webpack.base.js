// webpack 基础配置
const path = require('path');
const webpack = require("webpack");

// 是否是开发环境
const isDevelop = process.env.NODE_ENV === "development";

const config = {
    entry: {
        // 如果发现vender打包体积过大，可以将vender拆分或者用CommonsChunkPlugin分割代码
        vendor: isDevelop ? ["react", "react-dom", "react-router-dom"] : ["babel-polyfill", "console-polyfill", "raf/polyfill", "react", "react-dom", "react-router-dom"]
    },
    output: {
        path: path.resolve(__dirname, '../../server/static/cmsClient'),
        publicPath: '',
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", ".less"],
        alias: {
            "components": path.resolve(__dirname, '../src/components'),
            "images": path.resolve(__dirname, '../src/images'),
            "pages": path.resolve(__dirname, '../src/pages'),
            "styles": path.resolve(__dirname, '../src/styles'),
            "utils": path.resolve(__dirname, '../src/utils'),
            "commonjs": path.resolve(__dirname, '../src/utils/common.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\S*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
}

module.exports = config;
