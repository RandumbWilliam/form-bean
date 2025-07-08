<script setup lang="ts">
	import type { GenericObject } from 'vee-validate';
	import { evaluateConditions } from '~/form-builder/utils';
	import { cn } from '~/lib/utils';
	import { MultiLineElement, type MultiLineInstance } from '.';

	const props = withDefaults(
		defineProps<{
			elementInstance: MultiLineInstance;
			formValues?: GenericObject | null;
			draft?: boolean;
		}>(),
		{
			formValues: null,
			draft: false,
		}
	);

	const rules = MultiLineElement.generateValidationSchema(
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
			<FormControl>
				<Textarea
					type="text"
					:placeholder="props.elementInstance.properties.placeholder"
					v-bind="componentField"
					:rows="props.elementInstance.properties.rows"
					:class="
						cn({
							'resize-none': !props.elementInstance.properties.resize,
						})
					"
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
