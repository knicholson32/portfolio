import { getDirectoriesSync } from '$lib/helpers';
import { validate, type MetaSchema } from '$lib/types/meta';
import * as fs from 'node:fs';

export const loadMeta = (slug: string): MetaSchema => {
  if (slug.startsWith('/post')) slug = slug.substring(5);
  try {
    const rawData = fs.readFileSync(`./src/routes/post/${slug}/meta.json`, 'utf8');
    try {
      const data = JSON.parse(rawData);
      if (validate(data)) {
        return data as unknown as MetaSchema;
      } else {
        throw Error(`${validate.errors === undefined || validate.errors === null ? '' : validate.errors[0].message} -> ${JSON.stringify(validate.errors)}`);
      }
    } catch (e) {
      throw Error(`Could not parse JSON data: ${e}`);
    }
  } catch (e) {
    throw Error(`Error loading Metadata for slug '${slug}': ${e}`);
  }
}

export const loadPosts = (): { [key: string]: MetaSchema } => {
  const postDirectories = getDirectoriesSync('./src/routes/post');

  const posts: { [key: string]: MetaSchema } = {};
  for (const dir of postDirectories) {

    try {
      const rawData = fs.readFileSync(`./src/routes/post/${dir}/meta.json`, 'utf8');
      try {
        const data = JSON.parse(rawData);
        if (validate(data)) {
          const meta = data as unknown as MetaSchema;
          posts[dir] = {
            title: meta.title,
            description: meta.description
          };
        } else {
          throw Error(`${validate.errors === undefined || validate.errors === null ? '' : validate.errors[0].message} -> ${JSON.stringify(validate.errors)}`);
        }
      } catch (e) {
        throw Error(`Could not parse JSON data: ${e}`);
      }
    } catch (e) {
      throw Error(`Error loading Metadata for slug '${dir}': ${e}`);
    }
  }

  return posts;
}