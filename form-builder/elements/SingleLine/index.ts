import { TextCursorInput } from 'lucide-vue-next';
import * as yup from 'yup';
import { generateId } from '~/form-builder/utils';
import type { Element, ElementInstance } from '..';

import { Input } from './operand-value-inputs';
import SingleLineField from './SingleLineField.vue';
import SingleLineProperties from './SingleLineProperties.vue';

export const SingleLineType = 'single-line';

export const SingleLineElement: Element<
	typeof SingleLineType,
	SingleLineProperties,
	SingleLineValidations
> = {
	construct: (): SingleLineInstance => ({
		id: generateId(SingleLineType),
		type: SingleLineType,
		properties: {
			label: '',
			placeholder: '',
		},
		validations: {
			required: false,
			min: null,
			max: null,
		},
		conditions: null,
	}),
	generateValidationSchema: (validations) => {
		let schema = yup.string();

		if (validations.required) {
			schema = schema.required();
		}

		return schema;
	},
	conditionFns: {
		equals: {
			operandValueInput: Input,
			fn: (value: string, operandValue: string) => value === operandValue,
		},
		includes: {
			operandValueInput: Input,
			fn: (value: string, operandValue: string) => operandValue.includes(value),
		},
	},
	elementBtnProps: {
		icon: TextCursorInput,
		label: 'Single Line',
	},
	fieldComponent: SingleLineField,
	propertiesComponent: SingleLineProperties,
};

export type SingleLineInstance = ElementInstance<
	typeof SingleLineType,
	SingleLineProperties,
	SingleLineValidations
>;

export type SingleLineProperties = {
	label: string;
	placeholder: string;
};

export type SingleLineValidations = {
	required: boolean;
	min: number | null;
	max: number | null;
};
