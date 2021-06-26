const { promisify } = require("util");
const redis = require('redis');

const localConfig = {
    host: 'localhost',
    port: 6379
};
const config = process.env.REDIS_URL || localConfig;

const client = redis.createClient(config);

client.on('error', err => console.log(err));

module.exports.get = promisify(client.get).bind(client);
module.exports.set = promisify(client.set).bind(client);
module.exports.setex = promisify(client.setex).bind(client);
module.exports.del = promisify(client.del).bind(client);
module.exports.exists = promisify(client.exists).bind(client);