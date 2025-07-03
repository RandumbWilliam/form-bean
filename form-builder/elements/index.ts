import type { Component } from 'vue';
import type * as yup from 'yup';
import type { ConditionGroup } from '../condition';

import {
	MultiChoiceElement,
	MultiChoiceType,
	type MultiChoiceInstance,
} from './MultiChoice';
import {
	SingleChoiceElement,
	SingleChoiceType,
	type SingleChoiceInstance,
} from './SingleChoice';
import {
	SingleLineElement,
	SingleLineType,
	type SingleLineInstance,
} from './SingleLine';

export type Element<T extends ElementTypes, TProperties, TValidations> = {
	construct: () => ElementInstance<T, TProperties, TValidations>;
	generateValidationSchema: (validations: TValidations) => yup.AnySchema;
	conditionFns: Record<
		string,
		{
			operandValueInput: Component;
			/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
			fn: (value: any, operandValue: any) => boolean;
		}
	>;
	elementBtnProps: {
		icon: Component;
		label: string;
	};
	fieldComponent: Component<{
		elementInstance: ElementInstance<T, TProperties, TValidations>;
	}>;
	propertiesComponent: Component<{
		elementInstance: ElementInstance<T, TProperties, TValidations>;
	}>;
};

export type ElementInstance<T, TProperties, TValidations> = {
	id: string;
	type: T;
	properties: TProperties;
	validations: TValidations;
	conditions: ConditionGroup | null;
};

export type Option = {
	id: string;
	label: string;
};

export type ElementTypes = keyof typeof Elements;

export type Elements = (typeof Elements)[keyof typeof Elements];

export type ElementInstances =
	| SingleLineInstance
	| SingleChoiceInstance
	| MultiChoiceInstance;

export const Elements = {
	[SingleLineType]: SingleLineElement,
	[SingleChoiceType]: SingleChoiceElement,
	[MultiChoiceType]: MultiChoiceElement,
};

export const GroupElements = [
	{
		group: 'Text Fields',
		elements: [SingleLineElement],
	},
	{
		group: 'Choice Fields',
		elements: [SingleChoiceElement, MultiChoiceElement],
	},
];
