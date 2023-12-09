// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    config = require('../webpack.config'),
    ZipPlugin = require('zip-webpack-plugin');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

var packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

config.plugins = (config.plugins || []).concat(
    new ZipPlugin({
        filename: `微信读书评论-${packageInfo.version}.zip`,
        path: path.join(__dirname, '../'),
    })
);

// 和命令行运行 env NODE_ENV=production webpack 一样的效果
webpack(config, function (err) {
    if (err) throw err;
});
