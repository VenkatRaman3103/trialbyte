require('dotenv').config();

module.exports = {
    schema: './src/db/schema.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
        url: process.env.DATABASE_URL,
    },
};
