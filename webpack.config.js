const CleanPlugin = require('clean-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const path = {
    distDir: `${__dirname}/dist/`,
    entry: `${__dirname}/src/app/root.module.js`,
    index: `${__dirname}/src/index.html`,
    sassFiles: `${__dirname}/src/**/*.scss`,
    srcDir: `${__dirname}/src/`,
};

const rules = {
    annotate: {
        include: path.srcDir,
        test: /\.js$/,
        use: 'ng-annotate-loader',
    },
    babel: {
        include: path.srcDir,
        test: /\.js$/,
        use: 'babel-loader',
    },
    esLint: {
        enforce: 'pre',
        include: path.srcDir,
        test: /\.js$/,
        use: 'eslint-loader',
    },
    html: {
        exclude: path.index,
        include: path.srcDir,
        test: /\.html$/,
        use: [{
            loader: 'html-loader',
            options: {
                minimize: true,
            },
        }],
    },
    htmllint: {
        enforce: 'pre',
        exclude: path.index,
        include: path.srcDir,
        test: /\.html$/,
        use: 'htmllint-loader',
    },
    index: {
        include: path.srcDir,
        test: /^index\.html$/,
        use: 'html-loader',
    },
    styles: {
        include: path.srcDir,
        test: /\.scss$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?sourceMap!sass-loader?sourceMap',
        }),
    },
};

const plugins = {
    clean: new CleanPlugin([
        path.distDir,
    ], {
        root: path.rootDir,
    }),
    extract: new ExtractPlugin('css/styles.[hash].css'),
    index: new HtmlWebpackPlugin({
        template: path.index,
    }),
    notifier: new WebpackNotifierPlugin(),
    sassLint: new SassLintPlugin({
        glob: path.sassFiles,
    }),
    uglify: new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        sourceMap: true,
    }),
};

module.exports = {
    devServer: {
        contentBase: path.distDir,
        port: 8080,
        stats: 'errors-only',
    },
    devtool: 'source-map',
    entry: path.entry,
    module: {
        rules: [
            rules.annotate,
            rules.babel,
            rules.esLint,
            rules.html,
            rules.htmllint,
            rules.index,
            rules.styles,
        ],
    },
    output: {
        filename: 'js/bundle.[hash].js',
        path: path.distDir,
    },
    plugins: [
        plugins.clean,
        plugins.extract,
        plugins.index,
        plugins.notifier,
        plugins.sassLint,
        plugins.uglify,
    ],
    // sassLoader: {
    //     outputStyle: 'compressed',
    // },
};
