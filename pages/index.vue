<script setup lang="ts">
	import { Builder } from '~/form-builder';

	const draftForm = ref([{ id: 'test-form', elementInstances: [] }]);
</script>

<template>
	<section>
		<Builder :form="draftForm" />
	</section>
</template>
