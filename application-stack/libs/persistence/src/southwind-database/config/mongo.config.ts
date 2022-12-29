
export interface MongoConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
}

export default () => ({
    mongo: {
      host: process.env.MONGO_DATABASE_HOST,
      port: parseInt(process.env.MONGO_DATABASE_PORT, 10),
      name: process.env.MONGO_DATABASE_NAME,
      user: process.env.MONGO_DATABASE_USER,
      password: process.env.MONGO_DATABASE_PASSWORD,
    }
});