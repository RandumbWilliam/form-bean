import type { ElementInstances } from './elements';

export { default as Builder } from './Builder.vue';

export type Form = {
	id: string;
	elementInstances: ElementInstances[];
}[];
