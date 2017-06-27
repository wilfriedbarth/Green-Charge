// Splits which .config env we are using
module.exports = (env) => {
	return require(`./webpack.${env}.config.js`)
}