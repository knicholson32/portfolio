import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import Head from './Head.svelte';

test('Head', async () => {


  const title = (Math.random() + 1).toString(36).substring(7);
  const description = (Math.random() + 1).toString(36).substring(7);

  render(Head, { title, description });

  expect(document.title).toBe(title);
  expect((document.querySelector('meta[name="description"]') as { name: string, content: string } | null)?.name).toBe('description');
  expect((document.querySelector('meta[name="description"]') as { name: string, content: string } | null)?.content).toBe(description);

});