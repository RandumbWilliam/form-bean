<script setup lang="ts">
	import { cn } from '@/lib/utils';
	import { reactiveOmit } from '@vueuse/core';
	import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
	import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';
	import type { HTMLAttributes } from 'vue';

	const props = defineProps<
		NumberFieldRootProps & { class?: HTMLAttributes['class'] }
	>();
	const emits = defineEmits<NumberFieldRootEmits>();

	const delegatedProps = reactiveOmit(props, 'class');

	const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<NumberFieldRoot v-bind="forwarded" :class="cn('grid', props.class)">
		<slot />
	</NumberFieldRoot>
</template>
