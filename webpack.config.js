//webpack.config.js
const path = require('path');
const PugPlugin = require('pug-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: {
        index: './src/pages/index/index.pug',
        about: './src/pages/about/about.pug'
        //☝🏽 Insert your PUG HTML files here
    },
    output: {
        path: path.join(process.cwd(), 'dist/'),
        publicPath: '',
        filename: 'assets/js/[name].[contenthash:8].js'
        //☝🏽 Output filename of files with hash for unique id
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            //☝🏽 Format HTML (only in dev mode)
            extractCss: {
                filename: 'assets/css/[name].[contenthash:8].css'
            }
        }),
        new LiveReloadPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader
                //☝🏽 Load Pug files
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader']
                //☝🏽 Load Sass files
            },
            {
                // To use images on pug files:
                test: /\.(png|jpg|jpeg|ico)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[hash:8][ext]'
                }
            },
            {
                // To use fonts on pug files:
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]'
                }
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        watchFiles: {
            paths: ['src/**/*.*', 'assets/scss/**/*.*'],
            //☝🏽 Enables HMR in these folders
            options: {
                usePolling: true
            }
        }
    },
    resolve: {
        alias: {
            Styles: path.resolve(__dirname, 'src/styles/'),
            Assets: path.resolve(__dirname, 'src/assets/'),
            Scripts: path.resolve(__dirname, 'src/scripts/'),
            Templates: path.resolve(__dirname, 'src/templates/'),
            Includes: path.resolve(__dirname, 'src/includes/'),
        },
    },
    stats: 'errors-only'
    //☝🏽 For a cleaner dev-server run
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};