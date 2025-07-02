<script setup lang="ts">
	const model = defineModel<string>();
</script>

<template>
	<Input
		v-model="model"
		class="w-full border-none shadow-none"
		placeholder="Expected value"
	/>
</template>
