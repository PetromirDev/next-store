const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const setup = async () => {
    const db = await sqlite.open({filename: "./database.sqlite", driver: sqlite3.Database});
    await db.migrate({migrationsPath: './migrations', force: 'last'});
    console.log("Database setup complete");
}

setup();