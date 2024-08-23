module.exports = {
    entry: "./index.js",
    output: {
        path: `${__dirname}/dist`,
        filename: "mnv-ads-client.js",
        library: "MnvAdsClient",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
