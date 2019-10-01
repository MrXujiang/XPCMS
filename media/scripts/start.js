const HotModuleReplacementPlugin = require('react-hot-loader');
const webpack = require("webpack");
const merge = require('webpack-merge');
const baseConfig = require('../build/webpack.base');
const buildConfig = require('../build/build.config');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const pxtorem = require('postcss-pxtorem');
// 引入环境参数
const {env} = require('./env.js');

const config = {
    devtool: 'cheap-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: 'happypack/loader?id=styles'
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: "img/[name].[ext]?[hash]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            id: 'styles',
            threadPool: happyThreadPool,
            loaders: [ 'style-loader', 'css-loader', {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    // require('postcss-flexbugs-fixes'),
                    // autoprefixer({
                    //   browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', ],
                    //   flexbox: 'no-2009',
                    // }),
                    // 添加以下这句
                    pxtorem({ rootValue: 100, propWhiteList: [] })
                  ],
                },
              },
              {
                loader: "less-loader",
                options: {
                  javascriptEnabled: true
                }
              }
            ]
        })
    ],
    devServer: {
        port: "80",
        hot: true,
        compress: true,
        historyApiFallback: buildConfig.plugins.length < 2,
        host: "0.0.0.0",
        proxy: env,
        watchOptions: {
            aggregateTimeout: 1000,
            ignored: /node_modules/
        }
    }
};

const webpackConfig = merge(baseConfig, buildConfig, config);

module.exports = webpackConfig;
