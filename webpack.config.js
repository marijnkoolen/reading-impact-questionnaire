var path = require('path');

module.exports = {
    entry: "./src/main.jsx",
    output: {
        path: path.join(__dirname, "/public/js"),
        filename: "read_impact_quest.js",
        libraryTarget: "var",
        library: "ReadingImpactQuestionnaire"
    },
	devtool: 'inline-source-map',
    module: {
        rules: [
			{
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
