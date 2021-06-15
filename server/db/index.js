const spicedPG = require('spiced-pg');

const db = spicedPG(process.env.DATABASE_URL || "postgres:dim107:postgres@localhost:5432/socialnetwork");

module.exports.addUser = (first, last, email, hashedPassword) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first, last;
        `, [first, last, email, hashedPassword]
    );
};

module.exports.getUserInfo = (id) => db.query(`SELECT * FROM users WHERE id = $1`, [id]);

module.exports.findUser = (email) => db.query(`SELECT id, first, last, email, password_hash FROM users WHERE email=$1;`, [email]);

module.exports.findResetCode = (email) => {
    return db.query(
        `
        SELECT code FROM reset_codes 
        WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        `, [email]
    );
};

module.exports.setResetCode = (email, resetCode) => {
    return db.query(
        `
        INSERT INTO reset_codes (email, code)
        VALUES ($1, $2)
        `, [email, resetCode]
    );
};

module.exports.deleteResetCode = (email) => db.query(`DELETE FROM reset_codes WHERE email = $1`, [email]);

module.exports.setNewPassword = (email, newPassword) => {
    return db.query(
        `
        UPDATE users
        SET password_hash = $2 WHERE email = $1
        `, [email, newPassword]
    );
};

module.exports.updateUserPhoto = (id, url) => {
    return db.query(
        `
        UPDATE users 
        SET profile_picture_url = $2 WHERE id = $1 RETURNING *;
        `, [id, url]
    );
};


