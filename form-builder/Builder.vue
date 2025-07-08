<script setup lang="ts">
	import { ArrowDown, ArrowUp, Pencil, Trash2, X } from 'lucide-vue-next';
	import { VueDraggable } from 'vue-draggable-plus';

	import type { Form } from '.';
	import ConditionBuilder from './condition/ConditionBuilder.vue';
	import { Elements, GroupElements } from './elements';
	import { generateId } from './utils';

	const props = defineProps<{
		form: Form;
	}>();

	const form = ref(props.form);
	// const dragImageRefs = useTemplateRef('dragImageRefs');

	function onDraggableClone(element: Elements) {
		const elementInstance = element.construct();

		return elementInstance;
	}

	// function setData(dataTransfer: DataTransfer, dragEl: HTMLElement) {
	// 	const elementType = dragEl.dataset.elementType as ElementsType;
	// 	const dragImageElement = dragImageRefs.value?.find(
	// 		(ref) => ref.dataset.elementType === elementType
	// 	);

	// 	if (dragImageElement) {
	// 		dataTransfer.setDragImage(dragImageElement, 24, 24);
	// 	}
	// }

	function addPage(index: number) {
		form.value.pages.splice(index, 0, {
			id: generateId('page'),
			elementInstances: [],
		});
	}

	function deletePage(index: number) {
		form.value.pages.splice(index, 1);
	}

	function getConditionFields(pageIndex: number, elementIndex: number) {
		const fields = form.value.pages.slice(0, pageIndex + 1).map((page, i) => {
			if (i === pageIndex) {
				return {
					...page,
					elementInstances: page.elementInstances.slice(0, elementIndex),
				};
			}

			return { ...page };
		});

		return fields.filter(
			(page, i) => !(i === pageIndex && page.elementInstances.length === 0)
		);
	}
</script>

<template>
	<div class="bg-muted min-h-screen pt-16">
		<div
			class="bg-background fixed flex h-screen w-60 flex-col gap-3 border-r p-3"
		>
			<div
				v-for="(group, groupIndex) in GroupElements"
				:key="groupIndex"
				class="flex flex-col gap-1.5"
			>
				<h3 class="text-muted-foreground text-sm font-semibold">
					{{ group.group }}
				</h3>
				<VueDraggable
					v-model="group.elements"
					:group="{
						name: 'builder',
						pull: 'clone',
						put: false,
					}"
					:clone="onDraggableClone"
					:sort="false"
					class="flex flex-col gap-1"
				>
					<div
						v-for="(element, elementIndex) in group.elements"
						:key="elementIndex"
						class="hover:bg-muted flex w-full cursor-move items-center gap-3 rounded-md p-3 select-none"
					>
						<component :is="element.elementBtnProps.icon" :size="20" />
						<p class="text-sm">
							{{ element.elementBtnProps.label }}
						</p>
					</div>
				</VueDraggable>
			</div>
		</div>

		<div class="flex w-full justify-center pl-60">
			<pre>{{ form }}</pre>

			<Form class="flex w-full max-w-3xl flex-col p-6">
				<div
					v-for="(page, pageIndex) in form.pages"
					:key="page.id"
					class="flex w-full flex-col gap-1"
				>
					<div class="text-muted-foreground flex items-center justify-between">
						<p class="text-sm">Page {{ pageIndex + 1 }}</p>
						<div class="flex items-center gap-1.5">
							<button v-if="form.pages.length > 1 && pageIndex !== 0">
								<ArrowUp :size="18" />
							</button>
							<button
								v-if="
									form.pages.length > 1 && pageIndex !== form.pages.length - 1
								"
							>
								<ArrowDown :size="18" />
							</button>
							<button
								v-if="pageIndex !== 0"
								type="button"
								@click.prevent="deletePage(pageIndex)"
							>
								<X :size="18" />
							</button>
						</div>
					</div>

					<VueDraggable
						v-model="page.elementInstances"
						group="builder"
						:animation="150"
						ghost-class="ghost"
						class="bg-background flex min-h-80 w-full flex-col gap-1.5 border p-1.5"
					>
						<div
							v-for="(element, elementIndex) in page.elementInstances"
							:key="element.id"
							:data-element-id="element.id"
							class="group bg-background relative flex items-center gap-3 p-1 hover:outline"
						>
							<div class="pointer-events-none min-h-9 w-full">
								<component
									:is="Elements[element.type].fieldComponent"
									:element-instance="element"
									:draft="true"
								/>
							</div>
							<div class="absolute top-1 right-1 hidden gap-1 group-hover:flex">
								<Sheet>
									<SheetTrigger as-child>
										<Button type="button" size="icon">
											<Pencil />
										</Button>
									</SheetTrigger>
									<SheetContent class="sm:max-w-[600px]">
										<SheetHeader>
											<SheetTitle>
												Edit
												{{ Elements[element.type].elementBtnProps.label }}
											</SheetTitle>
											<SheetDescription>
												Make changes to the field or apply rules to it.
											</SheetDescription>
										</SheetHeader>
										<div class="overflow-y-auto px-4 pb-4">
											<Tabs default-value="properties">
												<TabsList class="grid w-full grid-cols-2">
													<TabsTrigger value="properties">
														Properties
													</TabsTrigger>
													<TabsTrigger value="rules">Rules</TabsTrigger>
												</TabsList>
												<TabsContent value="properties">
													<component
														:is="Elements[element.type].propertiesComponent"
														:element-instance="element"
													/>
												</TabsContent>
												<TabsContent value="rules">
													<ConditionBuilder
														:fields="
															getConditionFields(pageIndex, elementIndex)
														"
														:element-instance="element"
													/>
												</TabsContent>
											</Tabs>
										</div>
										<SheetFooter>
											<SheetClose as-child>
												<Button type="submit">Save changes</Button>
											</SheetClose>
										</SheetFooter>
									</SheetContent>
								</Sheet>
								<Button type="button" size="icon" variant="destructive">
									<Trash2 />
								</Button>
							</div>
						</div>
					</VueDraggable>

					<div class="my-6 flex items-center gap-3">
						<Separator class="flex-1" />
						<Button
							type="button"
							variant="outline"
							@click.prevent="addPage(pageIndex + 1)"
						>
							Add Page
						</Button>
						<Separator class="flex-1" />
					</div>
				</div>
			</Form>
		</div>
	</div>

	<!-- Ghost Images -->
	<!-- <div
		v-for="element in Object.values(MapElements)"
		:key="`${element.type}-drag-image`"
		ref="dragImageRefs"
		:data-element-type="element.type"
		class="absolute -top-[9999px] z-10 w-full max-w-3xl p-3"
	>
		<div class="bg-background border p-3">
			<component :is="element.dragImage" class="w-full" />
		</div>
	</div> -->
</template>

<style scoped>
	.ghost {
		background-color: var(--muted);
		outline: 1px dashed var(--border);
		border-radius: 0;
	}

	.ghost * {
		visibility: hidden;
	}
</style>
