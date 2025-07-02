import type { ElementInstances, ElementTypes } from '../elements';

export type Condition = {
	type: 'condition';
	elementInstance: {
		id: string;
		type: ElementTypes;
		properties: ElementInstances['properties'];
	} | null;
	operation: string | null;
	/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
	operandValue: any | null;
};

export type ConditionGroup = {
	type: 'group';
	operation: 'and' | 'or';
	operands: ConditionNode[];
};

export type ConditionNode = Condition | ConditionGroup;

export function defaultCondition(): Condition {
	return {
		type: 'condition',
		elementInstance: null,
		operation: null,
		operandValue: null,
	};
}

export function defaultConditionGroup(): ConditionGroup {
	return {
		type: 'group',
		operation: 'and',
		operands: [defaultCondition()],
	};
}
