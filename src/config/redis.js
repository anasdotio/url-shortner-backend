import Redis from 'ioredis';

const redisClient = new Redis('redis://localhost:6379');

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('ready', () => {
  console.log('Redis is ready to use');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('reconnecting', () => {
  console.log('Reconnecting to Redis...');
});

export const connectRedis = async () => {
  console.log('Connecting to Redis...');

  if (!redisClient.status || redisClient.status === 'end') {
    await redisClient.connect();
  }
};

export default redisClient;
