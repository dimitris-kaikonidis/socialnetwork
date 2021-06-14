const spicedPG = require('spiced-pg');

const db = spicedPG(process.env.DATABASE_URL || "postgres:dim107:postgres@localhost:5432/socialnetwork");

module.exports.addUser = (first, last, email, hashedPassword) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first, last;
        `,
        [first, last, email, hashedPassword]
    );
};

module.exports.findUser = (email) => {
    return db.query(
        `
        SELECT id, first, last, email, password_hash FROM users WHERE email=$1;
        `, [email]);
};