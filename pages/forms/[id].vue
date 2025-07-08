<script setup lang="ts">
	import { X } from 'lucide-vue-next';
	import { Builder, Render } from '~/form-builder';

	const route = useRoute();
	const formId = route.params.id as string;

	const { getForm, updateForm } = useForms();

	const { data, status } = await useLazyAsyncData(`form-${formId}`, () =>
		getForm(formId)
	);

	const preview = ref(false);

	function togglePreview() {
		preview.value = !preview.value;
	}

	async function onSave() {
		try {
			if (data.value) {
				await updateForm(data.value?.id, data.value?.form);

				alert('Saved');
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<template>
	<section v-if="status === 'pending'">Loading...</section>
	<section v-else-if="status === 'success' && data">
		<header
			class="bg-background fixed z-10 flex h-16 w-full items-center justify-between border-b px-4"
		>
			<template v-if="preview">
				<p>Previewing FORM TITLE</p>
				<Button type="button" size="icon" @click.prevent="togglePreview">
					<X />
				</Button>
			</template>
			<template v-else>
				<div class="flex items-center gap-3">
					<NuxtLink to="/forms" class="flex items-center gap-3">
						<img src="/logo.svg" width="20" height="20" />
					</NuxtLink>
					<p>{{ data.form.title }}</p>
				</div>
				<div class="flex gap-3">
					<Button variant="outline" @click.prevent="togglePreview">
						Preview
					</Button>
					<Button type="button" variant="outline" @click.prevent="onSave">
						Save
					</Button>
					<Button>Publish</Button>
				</div>
			</template>
		</header>

		<Render v-if="preview" :form="data.form" />
		<Builder v-else :form="data.form" />

		<Popover>
			<PopoverTrigger as-child>
				<Button variant="outline" class="absolute right-2 bottom-2">Dev</Button>
			</PopoverTrigger>
			<PopoverContent class="w-[800px]" align="end">
				<pre class="text-xs">{{ data }}</pre>
			</PopoverContent>
		</Popover>
	</section>
</template>
