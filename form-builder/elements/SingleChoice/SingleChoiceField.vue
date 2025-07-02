<script setup lang="ts">
	import type { GenericObject } from 'vee-validate';
	import { evaluateConditions } from '~/form-builder/utils';
	import { SingleChoiceElement, type SingleChoiceInstance } from '.';

	const props = withDefaults(
		defineProps<{
			elementInstance: SingleChoiceInstance;
			formValues?: GenericObject | null;
			draft?: boolean;
		}>(),
		{
			formValues: null,
			draft: false,
		}
	);

	const rules = SingleChoiceElement.generateValidationSchema(
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
		type="radio"
		name="type"
		:rules="rules"
	>
		<FormItem class="space-y-3">
			<FormLabel>
				<template v-if="props.elementInstance.properties.label">
					{{ props.elementInstance.properties.label }}
				</template>
				<span v-else-if="props.draft" class="text-muted-foreground italic">
					No Question
				</span>
			</FormLabel>

			<FormControl>
				<RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
					<FormItem
						v-for="option in props.elementInstance.properties.options"
						:key="option.id"
						class="flex items-center space-y-0 gap-x-3"
					>
						<FormControl>
							<RadioGroupItem :value="option.id" />
						</FormControl>
						<FormLabel class="font-normal">
							<template v-if="option.label">
								{{ option.label }}
							</template>
							<span
								v-else-if="props.draft"
								class="text-muted-foreground italic"
							>
								No Label
							</span>
						</FormLabel>
					</FormItem>
				</RadioGroup>
			</FormControl>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
