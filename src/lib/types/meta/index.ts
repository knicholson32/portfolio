import ajv from 'ajv';
import fs from 'node:fs';

export type * as Schema from './generated';
export const validate = (new ajv()).compile(JSON.parse(fs.readFileSync('src/lib/types/meta/post.frontmatter.schema.json').toString()));