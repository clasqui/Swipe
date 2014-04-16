var config = {
	local: {
		mode: 'local',
		port: 3000,
		ip: '127.0.0.1',
		mongodb: 'mongodb://127.0.0.1:27017/swipe'
	},

	staging: {
		mode: 'staging',
		port: 4000,
		ip: '127.0.0.1',
		mongodb: 'mongodb://127.0.0.1:27017/swipe'
	},

	production: {
		mode: 'production',
		port: process.env.OPENSHIFT_NODEJS_PORT,
		ip: process.env.OPENSHIFT_NODEJS_IP,
		mongodb: "mongodb://" + process.env.OPENSHIFT_MONGODB_DB_URL+'/swipe'
	}
}

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'production'] || config.production;
}