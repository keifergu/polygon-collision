module.exports = {
    entry: './src/collision.ts',
    output: {
        filename: './dist/collision.js'
    },
    resolve: {
        extensions: ['.webpack.js', 'web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}