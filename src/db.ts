import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import * as Schema from './schema';

const client = postgres('postgresql://postgres:postgres@localhost:5432/postgres', { max: 1 });
export const db = drizzle(client, { schema: Schema, logger: true });
