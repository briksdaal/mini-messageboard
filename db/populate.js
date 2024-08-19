const { Client } = require('pg');

function formatDate(dateString) {
  return new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '');
}

const DB_URL = process.argv[2];

const SQL = `
CREATE TABLE IF NOT EXISTS messageboard_messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR( 20 ),
    text TEXT,
    added TIMESTAMP
);

INSERT INTO messageboard_messages (username, text, added)
VALUES
    ('Boris', 'Hi there!', TO_TIMESTAMP('2023-08-14T18:24:24.823', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')),
    ('Luffy', 'We are!', TO_TIMESTAMP('2023-11-23T12:54:03.444', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'))
;
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({
    connectionString: DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done');
}

main();
