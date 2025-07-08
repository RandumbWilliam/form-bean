<script setup lang="ts">
	import { toTypedSchema } from '@vee-validate/zod';
	import { ClipboardPlus, Plus } from 'lucide-vue-next';
	import { useForm } from 'vee-validate';
	import { generateId } from '~/form-builder/utils';
	import { createFormDto } from '~/shared/dtos/forms.dto';

	const { getForms, createForm } = useForms();

	const { data, status } = useAsyncData('forms', () => getForms());

	const { isFieldDirty, handleSubmit } = useForm({
		validationSchema: toTypedSchema(createFormDto),
		initialValues: {
			pages: [{ id: generateId('page'), elementInstances: [] }],
		},
	});

	const openCreateForm = ref(false);

	const onSubmit = handleSubmit(async (values) => {
		try {
			const formId = await createForm(values);

			return navigateTo(`/forms/${formId}`);
		} catch (error) {
			console.error(error);
		}
	});
</script>

<template>
	<div>
		<header
			class="bg-background fixed z-10 flex h-16 w-full items-center justify-between border-b px-4"
		>
			<NuxtLink to="/forms" class="flex items-center gap-3">
				<img src="/logo.svg" width="20" height="20" />
				<p class="font-medium">FormBean</p>
			</NuxtLink>

			<div
				class="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm"
			>
				W
			</div>
		</header>

		<main class="relative h-screen px-4 pt-16">
			<section v-if="status === 'pending'">Loading...</section>
			<section v-else-if="status === 'success' && data" class="h-full py-4">
				<div
					v-if="data.length === 0"
					class="bg-muted text-muted-foreground mx-auto flex h-full flex-col items-center justify-center gap-2 rounded-lg"
				>
					<ClipboardPlus />
					<p class="text-sm font-medium">No Forms Found</p>
					<Button type="button" @click.prevent="openCreateForm = true">
						Create Form
					</Button>
				</div>

				<div v-else class="flex flex-col gap-3">
					<NuxtLink
						v-for="form in data"
						:key="form.id"
						:to="`/forms/${form.id}`"
						class="bg-background flex flex-col justify-between rounded-md border p-2"
					>
						<p class="font-medium">{{ form.form.title }}</p>
						<p class="text-muted-foreground text-sm">
							{{ form.submissionCount }} submissions
						</p>
					</NuxtLink>
				</div>

				<Dialog v-model:open="openCreateForm">
					<DialogTrigger as-child>
						<Button size="icon" class="absolute right-4 bottom-4 rounded-full">
							<Plus />
						</Button>
					</DialogTrigger>
					<DialogContent class="sm:max-w-xl">
						<DialogHeader>
							<DialogTitle>Create a new form</DialogTitle>
							<DialogDescription>
								Give your form a name. Click create when you're done.
							</DialogDescription>
						</DialogHeader>
						<form id="create-form" class="w-full space-y-6" @submit="onSubmit">
							<FormField
								v-slot="{ componentField }"
								name="title"
								:validate-on-blur="!isFieldDirty"
							>
								<FormItem>
									<FormLabel>Form title</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="e.g. 2025 Survey"
											v-bind="componentField"
										/>
									</FormControl>
								</FormItem>
							</FormField>
						</form>
						<DialogFooter>
							<Button type="submit" form="create-form">Create</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</section>
		</main>
	</div>
</template>
