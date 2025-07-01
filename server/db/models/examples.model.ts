import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const examplesModel = mysqlTable('examples', {
	id: varchar({ length: 36 }).primaryKey(),
	name: varchar({ length: 255 }),
});
