const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 3001,
        historyApiFallback: true,
    },
    output: {
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'chat',
            filename: 'remoteEntry.js',
            remotes: {
                host: `host@${process.env.REMOTE_HOST_URL || 'http://localhost:3000'}/remoteEntry.js`,
            },
            exposes: {
                './ChatApp': './src/ChatApp',
                './ChatWidget': './src/ChatWidget',
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: '', globOptions: { ignore: ['**/index.html'] } },
            ],
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
