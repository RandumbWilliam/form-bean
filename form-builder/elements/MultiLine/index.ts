import { Text } from 'lucide-vue-next';
import * as yup from 'yup';
import { generateId } from '~/form-builder/utils';
import type { Element, ElementInstance } from '..';

import MultiLineField from './MultiLineField.vue';
import MultiLineProperties from './MultiLineProperties.vue';
import { Input } from './operand-value-inputs';

export const MultiLineType = 'multi-line';

export const MultiLineElement: Element<
	typeof MultiLineType,
	MultiLineProperties,
	MultiLineValidations
> = {
	construct: (): MultiLineInstance => ({
		id: generateId(MultiLineType),
		type: MultiLineType,
		properties: {
			label: '',
			placeholder: '',
			resize: false,
			rows: 5,
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

		if (validations.min && validations.min > 0) {
			schema = schema.min(validations.min);
		}

		if (validations.max && validations.max > 0) {
			schema = schema.max(validations.max);
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
		icon: Text,
		label: 'Multi Line',
	},
	fieldComponent: MultiLineField,
	propertiesComponent: MultiLineProperties,
};

export type MultiLineInstance = ElementInstance<
	typeof MultiLineType,
	MultiLineProperties,
	MultiLineValidations
>;

export type MultiLineProperties = {
	label: string;
	placeholder: string;
	resize: boolean;
	rows: number;
};

export type MultiLineValidations = {
	required: boolean;
	min: number | null;
	max: number | null;
};
