import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: "postgresql://postgres:buse1235@localhost:5432/blog",

});

export default pool;