<script setup lang="ts">
	import type { GenericObject } from 'vee-validate';
	import { evaluateConditions } from '~/form-builder/utils';
	import { SingleLineElement, type SingleLineInstance } from '.';

	const props = withDefaults(
		defineProps<{
			elementInstance: SingleLineInstance;
			formValues?: GenericObject | null;
			draft?: boolean;
		}>(),
		{
			formValues: null,
			draft: false,
		}
	);

	const rules = SingleLineElement.generateValidationSchema(
		props.elementInstance.validations
	);

	const renderField = computed(() => {
		if (
			props.draft ||
			props.elementInstance.conditions === null ||
			props.formValues === null
		) {
			return true;
		}

		return evaluateConditions(
			props.elementInstance.conditions,
			props.formValues
		);
	});
</script>

<template>
	<FormField
		v-if="renderField"
		v-slot="{ componentField }"
		:name="props.elementInstance.id"
		:rules="rules"
	>
		<FormItem class="w-full">
			<FormLabel>
				<template v-if="props.elementInstance.properties.label">
					{{ props.elementInstance.properties.label }}
				</template>
				<span v-else-if="props.draft" class="text-muted-foreground italic">
					No Question
				</span>
			</FormLabel>
			<FormControl>
				<Input
					type="text"
					:placeholder="props.elementInstance.properties.placeholder"
					v-bind="componentField"
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
