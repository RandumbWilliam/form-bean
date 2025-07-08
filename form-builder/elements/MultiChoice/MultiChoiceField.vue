<script setup lang="ts">
	import { useField, type GenericObject } from 'vee-validate';
	import { evaluateConditions } from '~/form-builder/utils';
	import { MultiChoiceElement, type MultiChoiceInstance } from '.';

	const props = withDefaults(
		defineProps<{
			elementInstance: MultiChoiceInstance;
			formValues?: GenericObject | null;
			draft?: boolean;
		}>(),
		{
			formValues: null,
			draft: false,
		}
	);

	const { value } = useField<string[]>(props.elementInstance.id);

	const rules = MultiChoiceElement.generateValidationSchema(
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
		:name="props.elementInstance.id"
		:rules="rules"
		:value="value ?? []"
	>
		<FormItem class="space-y-3">
			<FormLabel>
				<span>
					<template v-if="props.elementInstance.properties.label">
						{{ props.elementInstance.properties.label }}
					</template>
					<span v-else-if="props.draft" class="text-muted-foreground italic">
						No Question
					</span>
					<span
						v-if="props.elementInstance.validations.required"
						class="text-destructive"
					>
						*
					</span>
				</span>
			</FormLabel>

			<FormField
				v-for="option in props.elementInstance.properties.options"
				v-slot="{ handleChange }"
				:key="option.id"
				type="checkbox"
				:value="option.id"
				:unchecked-value="false"
				:name="props.elementInstance.id"
			>
				<FormItem class="flex flex-row items-center space-y-0 space-x-2">
					<FormControl>
						<Checkbox
							:model-value="value.includes(option.id)"
							@update:model-value="handleChange"
						/>
					</FormControl>
					<FormLabel class="font-normal">
						{{ option.label }}
					</FormLabel>
				</FormItem>
			</FormField>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
