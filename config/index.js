var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongodb: 'mongodb://127.0.0.1:27017/swipe'
	},

	staging: {
		mode: 'staging',
		port: 4000,
		mongodb: 'mongodb://127.0.0.1:27017/swipe'
	},

	production: {
		mode: 'production',
		port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
		mongodb: 'admin:8V-phhR41hhl@'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/swipe'
	}
}

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'production'] || config.production;
}