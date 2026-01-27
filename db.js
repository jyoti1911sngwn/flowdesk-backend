// db.js
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",         // your DB username
  host: "localhost",        // your DB host
  database: "flowdesk_db",  // your DB name
  password: "your_password",// your DB password
  port: 5432,               // default PostgreSQL port
});
