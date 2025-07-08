import type { createFormDto } from '~/shared/dtos/forms.dto';

export const useForms = () => {
	async function getForms() {
		const forms = await $fetch('/api/forms');

		return forms;
	}

	async function getForm(formId: string) {
		const form = await $fetch(`/api/forms/${formId}`);

		return form;
	}

	async function createForm(body: createFormDto) {
		const formId = await $fetch('/api/forms', {
			method: 'POST',
			body,
		});

		return formId;
	}

	return {
		getForms,
		getForm,
		createForm,
	};
};
