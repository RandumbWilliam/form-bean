import { relations } from 'drizzle-orm';
import { json, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import type { Form } from '~/form-builder';

import { submissionsModel } from './submissions.model';

export const formsModel = mysqlTable('forms', {
	id: varchar({ length: 36 }).primaryKey(),
	form: json().$type<Form>().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
});

export const formsRelations = relations(formsModel, ({ many }) => ({
	submissions: many(submissionsModel),
}));
