// https://svelte.dev/docs/svelte/testing

import { render, screen, within } from '@testing-library/svelte';
// import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
// import * as elements from './';
import * as wrappers from '$lib/components/test-wrappers';

test('Paragraph (P)', async () => {

  render(wrappers.P, {});
  const p = screen.getByRole('paragraph');
  const child = within(p).getByTestId('child');
  expect(child).toBeInTheDocument();

});

test('Span (Span)', async () => {

  render(wrappers.Span, {});
  const span = screen.getAllByRole('generic')[1];
  expect(span.nodeType).toBe(1)
  const child = within(span).getByTestId('child');
  expect(child).toBeInTheDocument();

});