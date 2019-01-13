const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'eval',

    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        // host: '127.0.0.1',
        proxy: {
            '/coinmarketcap': {
              target: 'https://pro-api.coinmarketcap.com/v1',
              changeOrigin: true,
              pathRewrite: {
                '^/coinmarketcap': ''
              }
            }
        }
    },

});
