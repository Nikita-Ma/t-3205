import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    target: 'node', // Bundle for Node.js environment
    entry: './src/server.ts', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'build'), // Output directory
        filename: 'bundle.js', // Output filename
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve .ts and .js extensions
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Transpile TypeScript files
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader', // Use ts-loader for TypeScript
                },
            },
        ],
    },
    externals: [require('webpack-node-externals')()], // Exclude external Node modules from the bundle
};

export default config;