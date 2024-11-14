import remarkFrontmatter from 'remark-frontmatter';
import remarkLintFrontmatterSchema from 'remark-lint-frontmatter-schema';

const remarkConfig = {
  plugins: [
    remarkFrontmatter,
    [
      remarkLintFrontmatterSchema,
      {
        schemas: {
          /* One schema for many files */
          './src/lib/types/meta/post.frontmatter.schema.json': [
            /* Per-file association */
            // './content/creative-work/the-shipwreck__global-broken.md',

            /* Support glob patterns ———v */
            './src/routes/_content/posts/**/*.{md,mdx}',
            // …
            // `./` prefix is optional
            // 'content/creative-work/foobiz.md',
          ],

          // './content/ghost.schema.yaml': [
          //   './content/casper.md',
          //   './content/ether.md',
          // ],
        },
      },
    ],
  ],
};
export default remarkConfig;