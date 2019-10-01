//用于多页面
const HtmlWebpackPlugin = require('html-webpack-plugin');

const template = "./public/index.html";
// const templateWechat = "./public/wechat.html";
const PUBLIC_URL = "./public";

const config = {
    entry: {
        home: "./src/pages/home/index.js",
        // admin: "./src/pages/admin/index.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: template,
            filename: 'index.html',
            chunks: ["vendor", "home"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "CMS全栈博客"
        }),
        // new HtmlWebpackPlugin({
        //     template: template,
        //     filename: 'admin.html',
        //     chunks: ["vendor", "admin"],
        //     PUBLIC_URL: PUBLIC_URL,
        //     hash: true,
        //     title: "管理后台"
        // })
    ]
}

module.exports = config;
