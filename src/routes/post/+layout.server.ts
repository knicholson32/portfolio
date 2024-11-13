import { loadPosts } from '$lib/server/meta';
import { validate, type MetaSchema } from '$lib/types/meta';
import fs from 'node:fs';


export const load = async ({ route, parent }) => {

  let slug: string | null = null;
  let meta: MetaSchema | null = null;

  if (route.id !== '/post') {
    slug = route.id.split('/')[1];
    try {
      const rawData = fs.readFileSync(`./src/routes${route.id}/meta.json`, 'utf8');
      try {
        const data = JSON.parse(rawData);
        if (validate(data)) {
          meta = data as unknown as MetaSchema;
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



  return {
    route,
    meta,
    slug,
    postMeta: loadPosts(),
    ...await parent()
  }
}