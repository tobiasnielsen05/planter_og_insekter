import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",          // eller dit MySQL login
  password: "Zea96VuJ!2",          // dit password
  database: "gronfremtid"  // navnet på den database du oprettede
});

export default pool;