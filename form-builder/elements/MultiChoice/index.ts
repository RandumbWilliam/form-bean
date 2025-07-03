import { ListChecks } from 'lucide-vue-next';
import * as yup from 'yup';
import { generateId } from '~/form-builder/utils';
import type { Element, ElementInstance, Option } from '..';

import MultiChoiceField from './MultiChoiceField.vue';
import MultiChoiceProperties from './MultiChoiceProperties.vue';
import { MultiSelect } from './operand-value-inputs';

export const MultiChoiceType = 'multi-choice';

export const MultiChoiceElement: Element<
	typeof MultiChoiceType,
	MultiChoiceProperties,
	MultiChoiceValidations
> = {
	construct: (): MultiChoiceInstance => ({
		id: generateId(MultiChoiceType),
		type: MultiChoiceType,
		properties: {
			label: '',
			options: [
				{
					id: generateId('multi-choice-option'),
					label: 'Option 1',
				},
			],
		},
		validations: {
			required: false,
		},
		conditions: null,
	}),
	generateValidationSchema(validations) {
		let schema = yup.array(yup.string());

		if (validations.required) {
			schema = schema.min(1);
		}

		return schema;
	},
	conditionFns: {
		'exactly equals': {
			operandValueInput: MultiSelect,
			fn: (value: string[], operandValue: string[]) =>
				operandValue.length === value.length &&
				operandValue.every((v, i) => v === value[i]),
		},
		'one of': {
			operandValueInput: MultiSelect,
			fn: (value: string[], operandValue: string[]) =>
				value.some((v) => operandValue.includes(v)),
		},
	},
	elementBtnProps: {
		icon: ListChecks,
		label: 'Multi Choice',
	},
	fieldComponent: MultiChoiceField,
	propertiesComponent: MultiChoiceProperties,
};

export type MultiChoiceInstance = ElementInstance<
	typeof MultiChoiceType,
	MultiChoiceProperties,
	MultiChoiceValidations
>;

export type MultiChoiceProperties = {
	label: string;
	options: Option[];
};

export type MultiChoiceValidations = {
	required: boolean;
};
