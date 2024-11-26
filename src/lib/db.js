import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'g3s5d',
    password: 'Aegheviethe3',
    database: 'g3s5d',
    connectionLimit: 5, // Limite de connexions simultanées
});

export default pool;
