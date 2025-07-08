import { count, eq, getTableColumns } from 'drizzle-orm';
import { db } from '~/server/db';
import { formsModel, submissionsModel } from '~/server/db/schema';

export default defineEventHandler(async () => {
	const forms = await db
		.select({
			...getTableColumns(formsModel),
			submissionCount: count(submissionsModel.id),
		})
		.from(formsModel)
		.leftJoin(submissionsModel, eq(submissionsModel.formId, formsModel.id))
		.groupBy(formsModel.id);

	return forms;
});
