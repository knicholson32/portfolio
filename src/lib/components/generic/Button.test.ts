// https://svelte.dev/docs/svelte/testing

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Button from './Button.svelte';

test('Button', async () => {
  
  const user = userEvent.setup();

  let buttonClicked = false;
  const myClickHandler = () => buttonClicked = true;

  render(Button, { backgroundColor: '#ffffff', onClick: myClickHandler, label: 'My Button' });

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('My Button')
  
  expect(buttonClicked).toBe(false);
  await user.click(button);
  expect(buttonClicked).toBe(true);

});