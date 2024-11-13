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

export const loadPosts = (): { sortOrder: string[], posts: { [key: string]: MetaSchema } } => {
  console.log('Loading POSTS');
  const postDirectories = getDirectoriesSync('./src/routes/post');

  const posts: { [key: string]: MetaSchema } = {};

  const timestamps: {slug: string, rfc3339: string}[] = [];

  for (const dir of postDirectories) {
    try {
      const rawData = fs.readFileSync(`./src/routes/post/${dir}/meta.json`, 'utf8');
      try {
        const data = JSON.parse(rawData);
        if (validate(data)) {
          const meta = data as unknown as MetaSchema;
          posts[dir] = meta;
          timestamps.push({ slug: dir, rfc3339: meta.item.date_published });
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

  return {
    sortOrder: (timestamps.sort((a, b) => new Date(a.rfc3339).getTime() - new Date(b.rfc3339).getTime())).flatMap((v) => v.slug),
    posts
  }
}