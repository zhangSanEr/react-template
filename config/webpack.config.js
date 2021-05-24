
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        clientLogLevel: 'silent',
        compress: true,
        contentBase: path.join(__dirname, './src/'),
        after: (app, server, compiler) => {
            console.log('项目启动成功');
        },
        onListening: function (server) {
            const port = server.listeningApp.address().port;
            console.log('启动项目的地址:', `http://127.0.0.1:${port}`);
        },
        publicPath: '/',
        open: false,
        noInfo: true,
        useLocalIp: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        host: '127.0.0.1',
        port: 3000,
        stats: {
            colors: true
        }
    },
    entry: './src/index.jsx',
    // 将 jsx 添加到默认扩展名中，省略 jsx
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // jsx文件的正则
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    // loader 是 babel
                    loader: 'babel-loader',
                    options: {
                        // babel 转义的配置选项
                        babelrc: false,
                        presets: [
                            // 添加 preset-react
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'), { modules: false }]
                        ],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: true
        })
    ]
};