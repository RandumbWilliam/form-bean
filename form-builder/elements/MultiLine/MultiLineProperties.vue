<script setup lang="ts">
	import type { MultiLineInstance } from '.';

	const props = defineProps<{
		elementInstance: MultiLineInstance;
	}>();

	const elementInstance = ref(props.elementInstance);
</script>

<template>
	<div class="space-y-6">
		<div class="space-y-2">
			<Label for="multi-line-label">Question</Label>
			<Textarea
				id="multi-line-label"
				v-model="elementInstance.properties.label"
				type="text"
				placeholder="Ask your question..."
				class="h-20 resize-none"
			/>
		</div>

		<div class="flex items-center space-x-2">
			<Checkbox
				id="multi-line-required"
				v-model="elementInstance.validations.required"
			/>
			<Label for="multi-line-required">Required</Label>
		</div>

		<div class="space-y-2">
			<Label for="multi-line-label">Placeholder</Label>
			<Textarea
				id="multi-line-label"
				v-model="elementInstance.properties.placeholder"
				type="text"
				placeholder="Placeholder..."
				class="h-20 resize-none"
			/>
		</div>

		<NumberField
			id="multi-line-height"
			v-model="elementInstance.properties.rows"
			:min="1"
			class="w-full space-y-2"
		>
			<Label for="multi-line-min">Rows</Label>
			<NumberFieldContent>
				<NumberFieldInput class="px-3 text-start" placeholder="0" />
			</NumberFieldContent>
		</NumberField>

		<div class="flex items-center space-x-2">
			<Checkbox
				id="multi-line-resize"
				v-model="elementInstance.properties.resize"
			/>
			<Label for="multi-line-resize">Resizable</Label>
		</div>

		<div class="flex w-full gap-3">
			<NumberField
				id="multi-line-min"
				v-model="elementInstance.validations.min"
				:min="1"
				class="w-full space-y-2"
			>
				<Label for="multi-line-min">Min Characters</Label>
				<NumberFieldContent>
					<NumberFieldInput class="px-3 text-start" placeholder="0" />
				</NumberFieldContent>
			</NumberField>

			<NumberField
				id="multi-line-max"
				v-model="elementInstance.validations.max"
				:min="1"
				class="w-full space-y-2"
			>
				<Label for="multi-line-max">Max Characters</Label>
				<NumberFieldContent>
					<NumberFieldInput class="px-3 text-start" placeholder="0" />
				</NumberFieldContent>
			</NumberField>
		</div>
	</div>
</template>
