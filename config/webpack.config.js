const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const attainment = {};
attainment.srcDir = path.resolve(__dirname, '../src');
attainment.distDir = path.resolve(__dirname, '../dist');

attainment.entry = path.join(attainment.srcDir, 'app/root.module.js');
attainment.index = path.join(attainment.srcDir, 'index.html');

const loaders = {
    index: {
        include: attainment.srcDir,
        loader: 'html-loader',
        test: /^index\.html$/,
    },
};

const plugins = {
    index: new HtmlWebpackPlugin({
        template: attainment.index,
    }),
    notifier: new WebpackNotifierPlugin(),
};

module.exports = {
    devServer: {
        outputPath: attainment.distDir,
        port: 8080,
        stats: 'errors-only',
    },
    devtool: 'source-map',
    entry: attainment.entry,
    module: {
        loaders: [
            loaders.index,
        ],
    },
    output: {
        filename: 'js/bundle.[hash].js',
        path: attainment.distDir,
    },
    plugins: [
        plugins.index,
        plugins.notifier,
    ],
};
