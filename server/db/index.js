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

module.exports.findUser = (email) => db.query(`SELECT id, first, last, email, password_hash FROM users WHERE email=$1;`, [email]);

module.exports.setNewPassword = (email, tempPass) => {
    return db.query(
        `
        UPDATE users
        SET password_hash = $2 WHERE email = $1
        `, [email, tempPass]
    );
};

// module.exports.setNewPassword = (email, newPass) => {
//     return db.query(
//         `
//         UPDATE users 
//         SET password = $2 WHERE email = $1;
//         `, [email, newPass]
//     );
// };