<script setup lang="ts">
	import { defaultConditionGroup } from '.';
	import type { Form } from '..';
	import type { ElementInstances } from '../elements';
	import Group from './Group.vue';

	const props = defineProps<{
		fields: Form;
		elementInstance: ElementInstances;
	}>();

	const elementInstance = ref(props.elementInstance);

	const noFields = computed(() => {
		return props.fields.flatMap((page) => page.elementInstances).length === 0;
	});

	function initializeLogic() {
		elementInstance.value.conditions = defaultConditionGroup();
	}
</script>

<template>
	<div v-if="noFields">No previous fields</div>
	<template v-else>
		<Group
			v-if="elementInstance.conditions"
			v-model="elementInstance.conditions"
			:fields="props.fields"
			:level="0"
			@delete="elementInstance.conditions = null"
		/>
		<button
			v-else
			class="bg-muted text-muted-foreground flex h-12 w-full cursor-pointer items-center justify-center rounded-md border"
			@click.prevent="initializeLogic"
		>
			Add logic
		</button>
	</template>
</template>
