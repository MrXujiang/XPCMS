const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
const merge = require('webpack-merge');
const baseConfig = require('../build/webpack.base');
const buildConfig = require('../build/build.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
});

const config = {
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        // options: {
                        //   ident: 'postcss',
                        //   plugins: () => [
                        //     // require('postcss-flexbugs-fixes'),
                        //     // autoprefixer({
                        //     //   browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', ],
                        //     //   flexbox: 'no-2009',
                        //     // }),
                        //     // 添加以下这句
                        //     pxtorem({ rootValue: 100, propWhiteList: [] })
                        //   ],
                        // },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                          }
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: "img/[name].[ext]?[hash]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['../../page/pb']),
        new UglifyJSPlugin(),
        extractSass,
        new CopyWebpackPlugin([
            {
                from: './public/favicon.ico',
                to: './favicon.ico'
            }
        ]),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
};

const webpackConfig = merge(baseConfig, buildConfig, config);

module.exports = webpackConfig;
