import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME, // ten database
    process.env.DATABASE_USERNAME, //username dang nhap
    process.env.DATABASE_PASSWORD, //mat khau
    {
        host: process.env.DATABASE_HOST, //Link hosting
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connect success!');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelize;