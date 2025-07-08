import { relations } from 'drizzle-orm';
import { json, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { formsModel } from './forms.model';

export const submissionsModel = mysqlTable('submissions', {
	id: varchar({ length: 36 }).primaryKey(),
	formId: varchar({ length: 36 })
		.references(() => formsModel.id, {
			onUpdate: 'cascade',
			onDelete: 'cascade',
		})
		.notNull(),
	data: json(),
	createdAt: timestamp().defaultNow().notNull(),
});

export const submissionsRelations = relations(submissionsModel, ({ one }) => ({
	form: one(formsModel, {
		fields: [submissionsModel.formId],
		references: [formsModel.id],
	}),
}));
