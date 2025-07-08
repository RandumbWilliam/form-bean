import { z } from 'zod/v4';

// https://github.com/colinhacks/zod/issues/4691

export const ConditionSchema = z.object({
	type: z.literal('condition'),
	elementInstance: z
		.object({
			id: z.string(),
			type: z.string(),
			properties: z.any(),
		})
		.nullable(),
	operation: z.string().nullable(),
	operandValue: z.any(),
});

export const ConditionGroupSchema = z.object({
	type: z.literal('group'),
	operation: z.union([z.literal('and'), z.literal('or')]),
	get operands(): z.ZodArray<typeof ConditionNodeSchema> {
		return z.array(ConditionNodeSchema);
	},
});

const ConditionNodeSchema = z.union([
	ConditionSchema,
	ConditionGroupSchema as typeof ConditionGroupSchema,
]);

const Category = z.object({
	name: z.string(),
	get subcategories() {
		return z.array(Category);
	},
});

export const SingleLineSchema = z.object({
	id: z.string(),
	type: z.literal('single-line'),
	properties: z.object({
		label: z.string(),
		placeholder: z.string(),
	}),
	validations: z.object({
		required: z.boolean(),
		min: z.coerce.number().nullable(),
		max: z.coerce.number().nullable(),
	}),
	conditions: ConditionGroupSchema.nullable(),
});

export type test = z.infer<typeof SingleLineSchema>;
