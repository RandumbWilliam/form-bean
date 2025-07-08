<script setup lang="ts">
	import { cn } from '@/lib/utils';
	import { GripVertical, Trash2 } from 'lucide-vue-next';
	import { VueDraggable } from 'vue-draggable-plus';
	import {
		defaultCondition,
		defaultConditionGroup,
		type ConditionGroup,
		type ConditionNode,
	} from '.';
	import type { Form } from '..';
	import Condition from './Condition.vue';

	const props = defineProps<{
		modelValue: ConditionGroup;
		fields: Form['pages'];
		level: number;
	}>();

	const emit = defineEmits<{
		(e: 'delete'): void;
		(e: 'update:modelValue', value: ConditionNode): void;
	}>();

	const conditionGroup = computed({
		get: () => props.modelValue,
		set: (value) => emit('update:modelValue', value),
	});

	function addCondition() {
		conditionGroup.value.operands.push(defaultCondition());
	}

	function addGroup() {
		conditionGroup.value.operands.push(defaultConditionGroup());
	}

	function deleteNode(index: number) {
		conditionGroup.value.operands.splice(index, 1);
		if (conditionGroup.value.operands.length === 0) {
			emit('delete');
		}
	}
</script>

<template>
	<div
		:class="
			cn('flex w-full flex-col gap-1.5', {
				'rounded-lg border bg-gray-500/5 p-0.5': level > 0,
			})
		"
	>
		<Select v-model="conditionGroup.operation">
			<SelectTrigger class="bg-background w-[80px]">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="and">AND</SelectItem>
					<SelectItem value="or">OR</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>

		<VueDraggable
			v-model="conditionGroup.operands"
			group="logic"
			handle=".handle-logic"
			:animation="150"
			class="flex w-full flex-col gap-1.5"
		>
			<div
				v-for="(node, index) in conditionGroup.operands"
				:key="index"
				class="flex w-full gap-1.5"
			>
				<GripVertical
					class="handle-logic text-muted-foreground my-2"
					:size="20"
				/>

				<Condition
					v-if="node.type === 'condition'"
					:fields="props.fields"
					:condition="node"
				/>

				<Group
					v-else
					:model-value="node"
					:fields="props.fields"
					:level="props.level + 1"
					@update:model-value="(value) => emit('update:modelValue', value)"
					@delete="deleteNode(index)"
				/>

				<button type="button" class="h-fit" @click.prevent="deleteNode(index)">
					<Trash2 class="handle-logic text-muted-foreground my-2" :size="20" />
				</button>
			</div>
		</VueDraggable>

		<div class="m-2 flex justify-end gap-3">
			<button
				class="text-sm font-medium"
				type="button"
				@click.prevent="addCondition"
			>
				Add rule
			</button>
			<button
				v-if="level < 2"
				class="text-sm font-medium"
				@click.prevent="addGroup"
			>
				Add group
			</button>
		</div>
	</div>
</template>
