import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '~/server/db';
import { formsModel } from '~/server/db/schema';
import { createFormDto } from '~/shared/dtos/forms.dto';

const paramsSchema = z.object({
	id: z.string(),
});

export default defineEventHandler(async (event) => {
	const params = await getValidatedRouterParams(event, paramsSchema.parse);
	const formBody = await readValidatedBody(event, createFormDto.parse);

	await db
		.update(formsModel)
		.set({
			form: formBody,
		})
		.where(eq(formsModel.id, params.id));
});
