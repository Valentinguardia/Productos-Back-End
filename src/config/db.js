import Sequelize from "sequelize";
import { config } from "dotenv";

config({ path: '.env' });

const dbName = process.env.DEV_DB_NAME;
const dbUser = process.env.DEV_DB_USER;
const dbPassword = process.env.DEV_DB_PASSWORD;
const dbHost = process.env.DEV_DB_HOST;
const dbPort = process.env.DEV_DB_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
    },
  },
  logging: false,
});

export default sequelize;


