var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin        = require('copy-webpack-plugin');
var AssetsPlugin      = require('assets-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// use the `OPTIMIZE` env VAR to switch from dev to production build
var optimize = process.env.OPTIMIZE === 'true';

/**
 * Loaders used by webpack
 *
 */
var css = require("!raw!sass!./file.scss");
var loaders = [
    {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
            presets: ['es2015']
        }
    },
    {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
    }
];

/**
 * Configure Webpack's plugins to tweaks outputs:
 *
 * all builds:
 * - ExtractTextPlugin: output CSS to file instead of inlining it
 *
 * prod build:
 * - AssetsPlugin: paths to cache-busted's assets to read them from server
 * - DedupePlugin
 * - OccurenceOrderPlugin
 * - UglifyJsPlugin
 * - DefinePlugin: disable webpack env dev vars
 *
 * dev build:
 * - BrowserSyncPlugin: make hot reload via browsersync exposed at
 *   http://localhost:3000, proxified to the server app port
 */
var plugins = [
    new ExtractTextPlugin(optimize? 'app.[hash].css' : 'app.css'),
];

var postcss = [
    require('autoprefixer')(['last 2 versions']),
    require('css-mqpacker')
];

if (optimize) {
    plugins = plugins.concat([
        new AssetsPlugin({
            filename: '../build/webpack-assets.json'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false
            },
        }),
        new webpack.DefinePlugin({
            __SERVER__:      !optimize,
            __DEVELOPMENT__: !optimize,
            __DEVTOOLS__:    !optimize
        })
    ]);
} else {
    plugins = plugins.concat([
        new BrowserSyncPlugin({
            proxy: 'http://localhost:' + (process.env.PORT || 9104) + '/',
            open: false
        })
    ]);
}


module.exports = {
    entry: './app/initialize',
    output: {
        path: path.join(optimize? '../build/client' : '', 'public'),
        filename: optimize? 'app.[hash].js' : 'app.js',
        chunkFilename: optimize? 'register.[hash].js' : 'register.js'
    },
    resolve: {
        extensions: ['', '.js', '.sass', '.jst']
    },
    debug: !optimize,
    devtool: 'source-map',
    module: {
        loaders: loaders
    },
    plugins: plugins,
    postcss: postcss
};
