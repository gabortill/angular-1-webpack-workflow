const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const attainment = {};
attainment.rootDir = path.resolve(__dirname, '../');
attainment.srcDir = path.resolve(__dirname, '../src');
attainment.distDir = path.resolve(__dirname, '../dist');

attainment.entry = path.join(attainment.srcDir, 'app/root.module.js');
attainment.index = path.join(attainment.srcDir, 'index.html');

const loaders = {
    annotate: {
        include: attainment.srcDir,
        loader: 'ng-annotate-loader',
        test: /\.js$/,
    },
    babel: {
        include: attainment.srcDir,
        loader: 'babel-loader',
        query: {
            presets: ['latest'],
        },
        test: /\.js$/,
    },
    index: {
        include: attainment.srcDir,
        loader: 'html-loader',
        test: /^index\.html$/,
    },
};

const plugins = {
    clean: new CleanPlugin([
        attainment.distDir,
    ], {
        root: attainment.rootDir,
    }),
    index: new HtmlWebpackPlugin({
        template: attainment.index,
    }),
    notifier: new WebpackNotifierPlugin(),
    uglify: new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
    }),
};

const preLoaders = {
    esLint: {
        include: attainment.srcDir,
        loader: 'eslint-loader',
        test: /\.js$/,
    },
};

module.exports = {
    devServer: {
        outputPath: attainment.distDir,
        port: 8080,
        stats: 'errors-only',
    },
    devtool: 'source-map',
    entry: attainment.entry,
    eslint: {
        configFile: path.join(__dirname, '.eslintrc.js'),
    },
    module: {
        loaders: [
            loaders.annotate,
            loaders.babel,
            loaders.index,
        ],
        preLoaders: [
            preLoaders.esLint,
        ],
    },
    output: {
        filename: 'js/bundle.[hash].js',
        path: attainment.distDir,
    },
    plugins: [
        plugins.clean,
        plugins.index,
        plugins.notifier,
        plugins.uglify,
    ],
};
