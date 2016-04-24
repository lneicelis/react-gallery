require('dotenv').config();
const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    errorDetails: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            { test: /\.js?/, loader: 'babel', include: path.join(__dirname, 'src') },
            { test: /\.css$|\.scss$|\.sass$/, loader: 'style!css?modules!sass?sourceMap', include: path.join(__dirname, 'src') },
            { test: /\.jpg$|\.png$/, loader: 'url-loader?limit=10000' },
        ],
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};
