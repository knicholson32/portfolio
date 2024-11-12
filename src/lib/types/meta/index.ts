import ajv from 'ajv';
import metaSchema from '$lib/types/meta/metaSchema.json';

export type { MetaSchema } from './schema';
export const validate = (new ajv()).compile(metaSchema);