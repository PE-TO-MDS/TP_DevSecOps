const mysql = require('mysql2/promise');

// Configuration de la connexion MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gifts_db'
});

const giftModel = {
    getAllGifts: async () => {
        const [rows] = await pool.query('SELECT * FROM gifts');
        return rows;
    },
    addGift: async (gift) => {
        const [result] = await pool.query('INSERT INTO gifts (name, price) VALUES (?, ?)', [gift.name, gift.price]);
        return result;
    },
    updateGift: async (id, gift) => {
        const [result] = await pool.query('UPDATE gifts SET name = ?, price = ? WHERE id = ?', [gift.name, gift.price, id]);
        return result;
    },
    deleteGift: async (id) => {
        const [result] = await pool.query('DELETE FROM gifts WHERE id = ?', [id]);
        return result;
    }
};

module.exports = giftModel;
