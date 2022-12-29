
export interface PostgresConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
}

export default () => ({
    postgres: {
      host: process.env.POSTGRES_DATABASE_HOST,
      port: parseInt(process.env.POSTGRES_DATABASE_PORT, 10),
      name: process.env.POSTGRES_DATABASE_NAME,
      user: process.env.POSTGRES_DATABASE_USER,
      password: process.env.POSTGRES_DATABASE_PASSWORD,
    }
});