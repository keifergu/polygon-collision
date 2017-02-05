module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.webpack.js', 'web.js','.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
}