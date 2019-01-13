const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Webpack Boilerplate';
const packageJSON = require("./package.json");

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        bundle: path.join(dirApp, 'index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            src: path.join(__dirname, './src'),
            assets: path.join(__dirname, './assets'),
            components: path.join(__dirname, './src/components'),
            containers: path.join(__dirname, './src/containers'),
            contracts: path.join(__dirname, './src/contracts'),
            utils: path.join(__dirname, './src/utils'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
            VERSION: JSON.stringify(packageJSON.version),
            GIT_HOMEPAGE: JSON.stringify(packageJSON.homepage),
            
            // WEB3_PROVIDER_URL: JSON.stringify('wss://ropsten.infura.io/_ws'),
            NETWORK_VERSION: JSON.stringify('shasta'),
            NETWORK_NAME: JSON.stringify('Shasta Testnet'),
            CONTRACT_ADDRESS: JSON.stringify('TJbQXPvoBEheG2vyWu9f4UfzB7AmW4jLxx'),  //TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg
            // CONTRACT_ADDRESS: "TG2g9CjfdeUgZo8D7jEVmqWiEggpbhrBSD",
            PRIVATE_KEY:JSON.stringify("08ec350a7e5d0e557b536c1523331724029627519e5fce198f3388efa9b60f51"),
            TRONSCAN_URL: JSON.stringify('https://shasta.tronscan.org/'),
            TRONGRID_API: JSON.stringify("https://api.trongrid.io")
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle
        })
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                    plugins: ['react-hot-loader/babel']
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
