<script setup lang="ts">
	import type { Condition } from '.';
	import type { Form } from '..';
	import { Elements, type ElementInstances } from '../elements';

	const props = defineProps<{
		fields: Form;
		condition: Condition;
	}>();

	const condition = ref(props.condition);

	const element = computed(() => {
		if (condition.value.elementInstance) {
			return Elements[condition.value.elementInstance.type];
		}

		return null;
	});

	function handleElementInstance(el: ElementInstances) {
		condition.value.elementInstance = {
			id: el.id,
			type: el.type,
			properties: el.properties,
		};
		condition.value.operation = null;
		condition.value.operandValue = null;
	}
</script>

<template>
	<div class="bg-background w-full rounded-md border">
		<Select :model-value="condition.elementInstance?.id">
			<SelectTrigger class="w-full border-none shadow-none">
				<SelectValue placeholder="Select a question" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup v-for="(page, index) in props.fields" :key="page.id">
					<SelectLabel>Page {{ index + 1 }}</SelectLabel>
					<SelectItem
						v-for="el in page.elementInstances"
						:key="el.id"
						:value="el.id"
						@select="handleElementInstance(el)"
					>
						<div class="flex flex-col gap-1">
							<span v-if="el.properties.label">
								{{ el.properties.label }}
							</span>
							<span v-else class="text-muted-foreground italic">
								No Question
							</span>
							<span class="text-muted-foreground text-xs">
								{{ el.id }}
							</span>
						</div>
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>

		<div class="flex border-t">
			<div class="border-r">
				<Select
					v-model="condition.operation"
					:disabled="condition.elementInstance === null"
					@update:model-value="() => (condition.operandValue = null)"
				>
					<SelectTrigger class="w-[180px] border-none shadow-none">
						<SelectValue placeholder="Select an operation" />
					</SelectTrigger>
					<SelectContent v-if="element">
						<SelectGroup>
							<SelectItem
								v-for="operation in Object.keys(element.conditionFns)"
								:key="operation"
								:value="operation"
							>
								{{ operation }}
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<template v-if="element && condition.operation">
				<component
					:is="element.conditionFns[condition.operation].operandValueInput"
					v-model="condition.operandValue"
					:element-instance="condition.elementInstance"
				/>
			</template>
			<Input
				v-else
				:disabled="true"
				class="w-full border-none shadow-none"
				placeholder="Expected value"
			/>
		</div>
	</div>
</template>
