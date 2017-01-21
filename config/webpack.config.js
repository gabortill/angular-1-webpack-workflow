const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const attainment = {};
attainment.rootDir = path.resolve(__dirname, '../');
attainment.srcDir = path.resolve(__dirname, '../src');
attainment.distDir = path.resolve(__dirname, '../dist');

attainment.entry = path.join(attainment.srcDir, 'app/root.module.js');
attainment.index = path.join(attainment.srcDir, 'index.html');
attainment.sassFiles = path.join(attainment.srcDir, '**/*.scss');

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
    html: {
        exclude: attainment.index,
        include: attainment.srcDir,
        loader: 'html-loader',
        query: {
            minimize: true,
        },
        test: /\.html$/,
    },
    index: {
        include: attainment.srcDir,
        loader: 'html-loader',
        test: /^index\.html$/,
    },
    styles: {
        include: attainment.srcDir,
        loader: ExtractPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
        test: /\.scss$/,
    },
};

const plugins = {
    clean: new CleanPlugin([
        attainment.distDir,
    ], {
        root: attainment.rootDir,
    }),
    extract: new ExtractPlugin('css/styles.[hash].css'),
    index: new HtmlWebpackPlugin({
        template: attainment.index,
    }),
    notifier: new WebpackNotifierPlugin(),
    sassLint: new SassLintPlugin({
        configFile: 'config/.sass-lint.yml',
        glob: 'src/**/*.scss',
    }),
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
    htmllint: {
        exclude: attainment.index,
        include: attainment.srcDir,
        loader: 'htmllint-loader',
        query: {
            config: path.join(__dirname, '.htmllintrc'),
        },
        test: /\.html$/,
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
            loaders.html,
            loaders.index,
            loaders.styles,
        ],
        preLoaders: [
            preLoaders.esLint,
            preLoaders.htmllint,
        ],
    },
    output: {
        filename: 'js/bundle.[hash].js',
        path: attainment.distDir,
    },
    plugins: [
        plugins.clean,
        plugins.extract,
        plugins.index,
        plugins.notifier,
        plugins.sassLint,
        plugins.uglify,
    ],
    sassLoader: {
        outputStyle: 'compressed',
    },
};
