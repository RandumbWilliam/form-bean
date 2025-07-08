<script setup lang="ts">
	import { X } from 'lucide-vue-next';
	import { Builder, Render } from '~/form-builder';

	const route = useRoute();
	const formId = route.params.id as string;

	const { getForm } = useForms();

	const { data, status } = await useLazyAsyncData(`form-${formId}`, () =>
		getForm(formId)
	);

	const preview = ref(false);

	function togglePreview() {
		preview.value = !preview.value;
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
					<Button variant="outline">Save</Button>
					<Button>Publish</Button>
				</div>
			</template>
		</header>

		<Render v-if="preview" :form="data.form" />
		<Builder v-else :form="data.form" />
	</section>
</template>
