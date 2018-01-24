const {resolve} = require('path');

module.exports = {
    entry: './js/main.js',
    output: {
        path: resolve(__dirname, 'js'),
        filename: 'main.bundle.js'
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
};