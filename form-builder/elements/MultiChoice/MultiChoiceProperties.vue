<script setup lang="ts">
	import { X } from 'lucide-vue-next';
	import type { MultiChoiceInstance } from '.';

	const props = defineProps<{
		elementInstance: MultiChoiceInstance;
	}>();

	const elementInstance = ref(props.elementInstance);
</script>

<template>
	<div class="space-y-6">
		<div class="space-y-2">
			<Label for="multi-choice-label">Question</Label>
			<Textarea
				id="multi-choice-label"
				v-model="elementInstance.properties.label"
				type="text"
				placeholder="Ask your question..."
				class="h-20 resize-none"
			/>
		</div>

		<div class="flex items-center space-x-2">
			<Checkbox id="multi-choice-required" />
			<Label for="multi-choice-required">Required</Label>
		</div>

		<div class="space-y-2">
			<Label>Options</Label>
			<div
				v-for="option in props.elementInstance.properties.options"
				:key="option.id"
			>
				<div class="relative flex items-center gap-2">
					<Input
						ref="inputOptions"
						v-model="option.label"
						type="text"
						placeholder="Option"
						class="pr-8"
					/>
					<button type="button" class="absolute top-0 right-2 h-full">
						<X :size="18" class="text-muted-foreground" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
