import type { GenericObject } from 'vee-validate';
import type { ConditionNode } from './condition';
import { Elements } from './elements';

export function generateId(prefix: string): string {
	return `${prefix}_${Math.floor(Math.random() * 10e10)}`;
}

export function evaluateConditions(
	conditionNode: ConditionNode,
	formValues: GenericObject
): boolean {
	if (conditionNode.type === 'condition') {
		const { elementInstance, operation, operandValue } = conditionNode;

		if (elementInstance === null || operation === null || operandValue === null)
			return false;

		const element = Elements[elementInstance.type];
		const conditionFn = element.conditionFns?.[operation].fn;

		if (!conditionFn) {
			// shouldn't happen
			console.error(
				`${conditionNode.elementInstance?.id} - Condition fn missing?`
			);
			return false;
		}

		const value = formValues[elementInstance.id];
		return conditionFn(value, operandValue);
	}

	const { operation, operands } = conditionNode;

	const results = operands.map((operand) =>
		evaluateConditions(operand, formValues)
	);

	if (operation === 'and') {
		return results.every(Boolean);
	}

	if (operation === 'or') {
		return results.some(Boolean);
	}

	// shouldn't happen
	console.error('Condition group operation missing?');
	return false;
}
