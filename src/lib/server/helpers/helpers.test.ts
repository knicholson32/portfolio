import { expect, test } from 'vitest';
import * as helpers from '$lib/helpers'

test('delay', async () => {
  const start = (new Date()).getTime();
  await helpers.delay(250);
  const finish = (new Date()).getTime();
  expect(finish - start).toBeGreaterThan(249);
  expect(finish - start).toBeLessThanOrEqual(270);
});