const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'ippl',
  password: process.env.DB_PASSWORD || '1Sampai8', // Ganti dengan password asli
  server: process.env.DB_HOST || 'parfumweb.database.windows.net',
  database: process.env.DB_NAME || 'parfum',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: true, // Karena Azure SQL butuh encryption
    trustServerCertificate: false, // Wajib false di Azure
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const db = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = db;
