import { z } from 'zod';
import { db } from '~/server/db';

const paramsSchema = z.object({
	id: z.string(),
});

export default defineEventHandler(async (event) => {
	const params = await getValidatedRouterParams(event, paramsSchema.parse);

	const form = await db.query.formsModel.findFirst({
		where: (formsModel, { eq }) => eq(formsModel.id, params.id),
	});

	if (!form) {
		throw createError({
			status: 404,
			message: 'Form not found',
		});
	}

	return form;
});
