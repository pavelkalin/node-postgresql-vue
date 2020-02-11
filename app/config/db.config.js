module.exports = {
    HOST: "localhost",
    USER: process.env.NODE_TEST_DB_USER,
    PASSWORD: process.env.NODE_TEST_DB_PASSWORD,
    DB: process.env.NODE_TEST_DB_NAME,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}