import { getDirectoriesSync } from '$lib/server/helpers';
import { validate, type Schema } from '$lib/types/meta';
import * as fs from 'node:fs';
import { unified } from 'unified';
import yaml from 'yaml';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter'
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import remarkStringify from 'remark-stringify';
import { compile } from 'mdsvex';

export const getPageContent = async (slug: string, category: 'post') => {

  slug = slug.replace(/^\/|\/$/g, '');

  let folder: string;
  switch (category) {
    default:
    case 'post':
      folder = './src/routes/_content/posts';
      break;
  }

  const file = fs.readFileSync(`${folder}/${slug}/index.md`, 'utf-8')

  const results = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkExtractFrontmatter, { yaml: yaml.parse })
    .use(remarkStringify)
    // .use(rehypeTableOfContents)
    .process(file);

  return { data: results.data, file }
}

export const loadPosts = async (): Promise<{ sortOrder: string[], posts: { [key: string]: { frontmatter: Schema.Frontmatter, content: string } } }> => {
  console.log('Loading POSTS');
  const postDirectories = getDirectoriesSync('./src/routes/_content/posts/');

  const posts: { [key: string]: { frontmatter: Schema.Frontmatter, content: string } } = {};

  const timestamps: {slug: string, rfc3339: string}[] = [];

  for (const dir of postDirectories) {
    try {
      const _data = await getPageContent(dir, 'post');
      if (validate(_data.data)) {
        const data = _data.data as unknown as Schema.Frontmatter;
        posts[dir] = {
          frontmatter: data,
          content: (await compile(_data.file)).code
        }
        timestamps.push({ slug: dir, rfc3339: data.meta.date[0] });
      } else {
        throw Error(`${validate.errors === undefined || validate.errors === null ? '' : validate.errors[0].message} -> ${JSON.stringify(validate.errors)}`);
      }
    } catch (e) {
      throw Error(`Error loading '${dir}': Could not parse frontmatter data: ${e}`);
    }
  }

  return {
    sortOrder: (timestamps.sort((a, b) => new Date(a.rfc3339).getTime() - new Date(b.rfc3339).getTime())).flatMap((v) => v.slug),
    posts
  }
}