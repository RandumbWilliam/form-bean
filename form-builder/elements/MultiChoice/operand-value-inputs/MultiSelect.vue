<script setup lang="ts">
	import type { MultiChoiceInstance } from '..';

	const model = defineModel<string[]>();
	const props = defineProps<{
		elementInstance: MultiChoiceInstance;
	}>();
</script>

<template>
	<Select
		v-model="model"
		:multiple="true"
		class="w-full border-none shadow-none"
	>
		<SelectTrigger class="w-full border-none shadow-none">
			<SelectValue placeholder="Expected value" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectItem
					v-for="option in props.elementInstance.properties.options"
					:key="option.id"
					:value="option.id"
				>
					{{ option.label }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
</template>
