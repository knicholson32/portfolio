import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ["src/**/*.svelte"],

    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    ignores: ["README.md", "backups/", "build/", ".svelte-kit/", "dist/", ".svelte-kit/", ".wrangler/", "html/", "tests/", "**/*.spec.ts", ".github", "src/lib/types/meta/generated", "*.js"]
  },
];