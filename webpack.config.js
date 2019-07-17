const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// project root path  
//console.log(path.join(__dirname, 'public'));

// entry -> output

module.exports = (env) => {
    const isProduction = env === 'production';
    console.log('env', env);

    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/, // check for .js file extension 
                exclude: /node_modules/
            }, {
                test: /\.s?css$/, // check for .css/.scss file extension
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        // choose a style of source mapping depending on the build type (dev or prod)
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};