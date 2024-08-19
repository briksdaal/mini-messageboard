const pool = require('./pool');

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messageboard_messages');
  return rows;
}

async function addMessage(username, text) {
  const dateFormat = 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"';
  await pool.query(
    `INSERT INTO messageboard_messages (username, text, added) VALUES ($1, $2, TO_TIMESTAMP($3, $4))`,
    [username, text, new Date(Date.now()), dateFormat]
  );
}

module.exports = {
  getAllMessages,
  addMessage,
};
