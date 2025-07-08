import { z } from 'zod';

export const createFormDto = z.object({
	title: z.string().min(1, { message: 'Required' }),
	description: z.string().nullish(),
	pages: z.array(
		z.object({
			id: z.string(),
			elementInstances: z.array(z.any()),
		})
	),
});

export type createFormDto = z.infer<typeof createFormDto>;
