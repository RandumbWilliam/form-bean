import { db } from '~/server/db';
import { formsModel } from '~/server/db/schema';
import { createFormDto } from '~/shared/dtos/forms.dto';

export default defineEventHandler(async (event) => {
	const formBody = await readValidatedBody(event, createFormDto.parse);

	const formId = crypto.randomUUID();
	await db.insert(formsModel).values({
		id: formId,
		form: formBody,
	});

	return formId;
});
