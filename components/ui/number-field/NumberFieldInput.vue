<script setup lang="ts">
	import { cn } from '@/lib/utils';
	import { NumberFieldInput } from 'reka-ui';
	import type { HTMLAttributes } from 'vue';

	const props = defineProps<{
		class?: HTMLAttributes['class'];
	}>();
</script>

<template>
	<NumberFieldInput
		data-slot="input"
		:class="
			cn(
				'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent py-1 text-center text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				props.class
			)
		"
	/>
</template>
