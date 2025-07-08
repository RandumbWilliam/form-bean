<script setup lang="ts">
	import type { SingleLineInstance } from '.';

	const props = defineProps<{
		elementInstance: SingleLineInstance;
	}>();

	const elementInstance = ref(props.elementInstance);
</script>

<template>
	<div class="space-y-6">
		<div class="space-y-2">
			<Label for="single-line-label">Question</Label>
			<Textarea
				id="single-line-label"
				v-model="elementInstance.properties.label"
				type="text"
				placeholder="Ask your question..."
				class="h-20 resize-none"
			/>
		</div>

		<div class="flex items-center space-x-2">
			<Checkbox
				id="single-line-required"
				v-model="elementInstance.validations.required"
			/>
			<Label for="single-line-required">Required</Label>
		</div>

		<div class="space-y-2">
			<Label for="single-line-label">Placeholder</Label>
			<Textarea
				id="single-line-label"
				v-model="elementInstance.properties.placeholder"
				type="text"
				placeholder="Placeholder..."
				class="h-20 resize-none"
			/>
		</div>

		<div class="flex w-full gap-3">
			<NumberField
				id="single-line-min"
				v-model="elementInstance.validations.min"
				:min="1"
				class="w-full space-y-2"
			>
				<Label for="single-line-min">Min Characters</Label>
				<NumberFieldContent>
					<NumberFieldInput class="px-3 text-start" placeholder="0" />
				</NumberFieldContent>
			</NumberField>

			<NumberField
				id="single-line-max"
				v-model="elementInstance.validations.max"
				:min="1"
				class="w-full space-y-2"
			>
				<Label for="single-line-max">Max Characters</Label>
				<NumberFieldContent>
					<NumberFieldInput class="px-3 text-start" placeholder="0" />
				</NumberFieldContent>
			</NumberField>
		</div>
	</div>
</template>
