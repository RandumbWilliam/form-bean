import type { ElementInstances } from './elements';

export { default as Builder } from './Builder.vue';
export { default as Render } from './Render.vue';

export type Form = {
	title: string;
	description?: string | null;
	pages: {
		id: string;
		elementInstances: ElementInstances[];
	}[];
};
