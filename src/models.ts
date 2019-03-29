import { createModel } from '@rematch/core';

export type SharksState = number;

export const sharks = createModel({
  state: 0,
  reducers: {
    increment: (state: SharksState, payload: number): SharksState => state + payload,
  },
  effects: {
    // TODO: Optional args breaks TypeScript autocomplete (e.g. payload: number = 1)
    async incrementAsync(payload: number) {
      this.increment(payload || 1);
    },
  },
});

export type TokenState = string;

export const token = createModel({
  state: '',
  reducers: {
    setToken: (state: TokenState, payload: string): TokenState => payload,
  },
});
