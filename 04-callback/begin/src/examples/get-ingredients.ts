import { ingredients } from './ingredients';

/**
 * TODO
 * Wait for a delay, get the ingredients,
 * then pass them in a callback function
 */

export function getDataAterDelay(
  delayMs: number,
  callback: (data: string[]) => void,
) {
  setTimeout(() => {
    const data = ingredients;
    callback(data);
  }, delayMs)
}
