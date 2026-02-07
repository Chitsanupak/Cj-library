import pkg from "pg";
const { Pool } = pkg;

const connectionPool = new Pool({
    user: "postgres",
    password: "78910123",     
    host: "localhost",
    port: 5432,              
    database: "CJ-LIBRARY",
});

export default connectionPool;
