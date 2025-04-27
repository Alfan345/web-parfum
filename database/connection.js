const sql = require('mssql');

const config = {
  user: 'ippl',
  password:'1Sampai8', // Ganti dengan password asli
  server: 'parfumweb.database.windows.net',
  database: 'parfum',
  port: 1433,
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
