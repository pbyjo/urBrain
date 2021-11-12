const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const rulesForJavascript = {
    test: /\.(jsx|js)$/,
    include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    /* resuelve el import react  */
                    runtime: 'automatic' // 'classic'
                }
            ]
        ]
    }
}

const rulesForFiles = {
    test: /\.(png|jpe?g|gif)$/i,
    include: [
        path.resolve(__dirname, 'src', 'assets')
    ],
    /* options: {
        name: '[path][name].[ext]',
    }, */
    use: ['file-loader'],
}

const rulesForCss = {
    test: /\.css|.scss$/,
    include: [
        path.resolve(__dirname, 'src', 'sass')
    ],
    use: ['style-loader', 'css-loader', 'sass-loader'],
}

const rules = [
    rulesForJavascript,
    rulesForCss,  
    rulesForFiles
]

/* Config */
module.exports = (env, argv) => {

    const {mode} = argv
    const isProduction = mode === 'production'

    // podemos hacer que el objeto de config se convierta
    // en una fn que retorna las diferentes configs

    return {
        entry: './src/index.js',

        /* Necesitaremos obtener la ruta absoluta con path */
        output: {
            filename: isProduction 
            ? '[name].[contenthash].js'
            : 'main.js', // podemos setear un nombre al archivo final
            path: path.resolve(__dirname, 'production')
        },

        /* loaders */
        module : {
            rules
        },

        resolve: {
            extensions: ['.js', '.jsx', '.scss']
        },

        plugins: [
            new HtmlWebpackPlugin(
                {
                    template: './src/public/index.html'
                }
            )
        ],

        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },

        devServer: {
            open: false,
            port: 3000,
            compress: true,
        },

        devtool: 'source-map'
    }
}