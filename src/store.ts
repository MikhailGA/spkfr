import * as models from './models';
import { init, RematchRootState } from '@rematch/core';

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type iRootState = RematchRootState<typeof models>;
