var path = require('path');

module.exports = {
    entry: "./src/main.jsx",
    output: {
        path: path.join(__dirname, "/public/js"),
        filename: "read_impact_quest.js"
    },
	devtool: 'inline-source-map',
    module: {
        loaders: [
			{ test: path.join(__dirname, 'src'), loader: 'babel' },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
