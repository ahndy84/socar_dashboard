module.exports = {
	//server_port: 3000,
	server_port: process.env.PORT || 3030,
	//db_url: 'mongodb://localhost:27017/local',
	db_url: `mongodb://${process.env.DB_HOST || 'localhost'}:27017/${process.env.DB || 'local'}`,

	db_schemas: [
	    {file:'./user_schema', collection:'users5', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [
	],
	jsonrpc_api_path : '/api'
}
