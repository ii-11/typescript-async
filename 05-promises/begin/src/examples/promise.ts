import { heroes } from './heroes';
import { Hero } from '../lib';

/**
 * Return a fulfilled promise after a given delay.
 */
const delay: (ms: number) => Promise<void> = (ms: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

/**
 * Return a fulfilled promise of heroes
 */
let getHeroesDelayedAsync: () => Promise<Hero[]> = () => {
  return new Promise<Hero[]>(resolve => resolve(heroes));
}

/**
 * Return a fulfilled promise of empty array
 */
let getHeroesEmpty: () => Promise<Hero[]> = () => Promise.resolve([]);
//  new Promise<Hero[]>(resolve => resolve([]));


/**
 * Get the heroes via a Promise
 */
export let getHeroesViaPromise: () => Promise<Hero[]> = () => {
  return delay(1000).then(() => getHeroesDelayedAsync());
}

/**
 * Create and return a promise.
 * When invoked, it will settle
 * by either resolve or reject.
 */
export let getHeroesViaNewPromise: () => Promise<Hero[]> = function() {
  const newPromise = new Promise<Hero[]>((resolve, reject) => {
    return delay(1000)
      .then(() => getHeroesDelayedAsync())
      .then((heroes: Hero[]) => {
        if (heroes && heroes.length) {
          resolve(heroes);
        } else {
          reject(Error('Ugh,something went wrong'));
        }
      });
  });
  return newPromise;
}

/**
 * Get the heroes,
 * except this always causes a Promise reject
 */
export let getHeroesViaPromiseReject: () => Promise<Hero[]> = function() {
  const newPromise = new Promise<Hero[]>((resolve, reject) => {
    return delay(1000)
      .then(() => getHeroesEmpty())
      .then(heroes => {
        if (heroes && heroes.length) {
          resolve(heroes);
        } else {
          reject(Error('Ugh,something went wrong'));
        }
      });
  });
  return newPromise;
}

/**
 * Get the heroes
 * Except this always causes a Promise to reject, too
 */
export let getHeroesViaPromiseRejectShorter: () => Promise<Hero[]> = function() {
  const getsHeroesOrDoesIt = () => Promise.reject('bad error occurred getting the heroes');
  return delay(1000).then(()=> getsHeroesOrDoesIt());
}
