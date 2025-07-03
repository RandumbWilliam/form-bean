import { CircleCheck } from 'lucide-vue-next';
import * as yup from 'yup';
import { generateId } from '~/form-builder/utils';
import type { Element, ElementInstance, Option } from '..';

import { MultiSelect, SingleSelect } from './operand-value-inputs';
import SingleChoiceField from './SingleChoiceField.vue';
import SingleChoiceProperties from './SingleChoiceProperties.vue';

export const SingleChoiceType = 'single-choice';

export const SingleChoiceElement: Element<
	typeof SingleChoiceType,
	SingleChoiceProperties,
	SingleChoiceValidations
> = {
	construct: (): SingleChoiceInstance => ({
		id: generateId(SingleChoiceType),
		type: SingleChoiceType,
		properties: {
			label: '',
			options: [],
		},
		validations: {
			required: false,
		},
		conditions: null,
	}),
	generateValidationSchema(validations) {
		let schema = yup.string();

		if (validations.required) {
			schema = schema.required();
		}

		return schema;
	},
	conditionFns: {
		equals: {
			operandValueInput: SingleSelect,
			fn: (value: string, operandValue: string) => value === operandValue,
		},
		'one of': {
			operandValueInput: MultiSelect,
			fn: (value: string, operandValue: string[]) =>
				operandValue.includes(value),
		},
	},
	elementBtnProps: {
		icon: CircleCheck,
		label: 'Single Choice',
	},
	fieldComponent: SingleChoiceField,
	propertiesComponent: SingleChoiceProperties,
};

export type SingleChoiceInstance = ElementInstance<
	typeof SingleChoiceType,
	SingleChoiceProperties,
	SingleChoiceValidations
>;

export type SingleChoiceProperties = {
	label: string;
	options: Option[];
};

export type SingleChoiceValidations = {
	required: boolean;
};
