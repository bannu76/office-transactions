const { Db } = require("mongodb");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "transactions.db");
let dbObj = null;

const createTable = `CREATE TABLE IF NOT EXISTS offtransaction(id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, amount INTEGER NOT NULL, description TEXT, exe_date TEXT, balance INTEGER)`;
const db = async () => {
  try {
    dbObj = await open({ filename: dbPath, driver: sqlite3.Database });
    await dbObj.run(createTable);
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
  await dbObj.close();
};

module.exports = db;
