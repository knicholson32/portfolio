import ajv from 'ajv';
import fs from 'node:fs';

export type { JSONFeedItem as MetaSchema } from './schema';
export const validate = (new ajv()).compile(JSON.parse(fs.readFileSync('src/lib/types/meta/metaSchema.json').toString()));