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

module.exports.findUsers = (query) => {
    return db.query(
        `
        SELECT id, first, last, profile_picture_url, CONCAT(first, ' ', last) AS name 
        FROM users 
        WHERE CONCAT(first, ' ', last) ILIKE $1 
        ORDER BY first 
        LIMIT 5;
        `, ["%" + query + "%"]
    );
};

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

module.exports.setBio = (id, bio) => {
    return db.query(
        `
        UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio;
        `, [id, bio]
    );
};

module.exports.makePost = (post, id) => db.query(`INSERT INTO posts (post, user_id) VALUES ($1, $2)`, [post, id]);
module.exports.deleletePost = (id) => db.query(`DELETE FROM posts WHERE id = $1`, [id]);
module.exports.getAllPostsFirst = (id) => db.query(
    `
    SELECT DISTINCT ON (posts.id) posts.id, first, last, user_id, profile_picture_url, post, posts.created_at FROM users 
    RIGHT JOIN posts
    ON (users.id = posts.user_id)
    LEFT JOIN friends
    ON (users.id = friends.sender OR users.id = friends.receiver)
    WHERE (friends.sender = $1 OR friends.receiver = $1) AND friends.status = TRUE
    ORDER BY (posts.id) DESC LIMIT 5;
    `, [id]
);

module.exports.getAllPostsNext = (id, lastId) => db.query(
    `
    SELECT DISTINCT ON (posts.id) posts.id, first, last, user_id, profile_picture_url, post, posts.created_at FROM users
    RIGHT JOIN posts
    ON (users.id = posts.user_id)
    LEFT JOIN friends
    ON (users.id = friends.sender OR users.id = friends.receiver)
    WHERE ((friends.sender = $1 OR friends.receiver = $1) AND friends.status = TRUE) AND posts.id < $2
    ORDER BY (posts.id) DESC LIMIT 5;
    `, [id, lastId]
);

module.exports.checkFriendStatus = (myUserId, OtherUserId) => {
    return db.query(
        `
        SELECT * FROM friends 
        WHERE (receiver = $2 AND sender = $1) OR (receiver = $1 AND sender = $2);
        `, [myUserId, OtherUserId]
    );
};

module.exports.sendFriendRequest = (myUserId, OtherUserId) => {
    return db.query(
        `
        INSERT INTO friends (sender, receiver, status) VALUES ($1, $2, false)
        `, [myUserId, OtherUserId]
    );
};

module.exports.deleteFriendRequest = (myUserId, OtherUserId) => {
    return db.query(
        `
        DELETE FROM friends
        WHERE (receiver = $2 AND sender = $1) OR (receiver = $1 AND sender = $2);
        `, [myUserId, OtherUserId]
    );
};

module.exports.acceptFriendRequest = (myUserId, OtherUserId) => {
    return db.query(
        `
        UPDATE friends SET status = true
        WHERE (receiver = $2 AND sender = $1) OR (receiver = $1 AND sender = $2);
        `, [myUserId, OtherUserId]
    );
};

module.exports.getFriendRequests = (myUserId) => {
    return db.query(
        `
       	SELECT friends.id, sender, receiver, status, users.first, users.last, users.profile_picture_url FROM friends
		JOIN users
        ON(sender = $1 AND receiver = users.id AND status = FALSE) 
        OR(receiver = $1 AND sender = users.id AND status = FALSE);
        `, [myUserId]
    );
};

module.exports.getFriends = (myUserId) => {
    return db.query(
        `
        SELECT friends.id, users.first, users.last, users.profile_picture_url,
        CASE 
            WHEN receiver = $1 THEN sender
            WHEN sender = $1 THEN receiver
        END AS user_id
        FROM friends
        JOIN users
        ON (sender = $1 AND receiver = users.id AND status = TRUE)
        OR (receiver = $1 AND sender = users.id AND status = TRUE);
        `, [myUserId]
    );
};

module.exports.addMessage = (sender, receiver, msg) => {
    return db.query(
        `
        INSERT INTO messages(sender, receiver, msg) VALUES($1, $2, $3) RETURNING *;
        `, [sender, receiver, msg]
    );
};

module.exports.getMessagesFirst = (myId, targetUserId) => {
    return db.query(
        `
        SELECT * FROM messages 
        WHERE (sender = $1 AND receiver = $2) OR (receiver = $1 AND sender = $2)
        ORDER BY created_at LIMIT 20;
        `, [myId, targetUserId]
    );
};