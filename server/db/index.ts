import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

export const databaseUrl = (() => {
	const url = new URL('mysql://');
	url.host = process.env.DB_HOST || 'localhost';
	url.port = (process.env.DB_PORT || 3306).toString();
	url.pathname = process.env.DB_DATABASE!;
	url.username = process.env.DB_USER!;
	url.password = process.env.DB_PASSWORD!;
	return url.toString();
})();

export const db = drizzle({
	connection: databaseUrl,
	casing: 'snake_case',
	schema,
	mode: 'default',
});
