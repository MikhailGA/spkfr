import { createModel } from '@rematch/core';
import { Profile, Exam, Theme } from './interfaces';

export const profile = createModel({
  state: {} as Profile,
  reducers: {
    setProfile: (state: Profile, payload: Profile): Profile => payload,
  },
});

export const exams = createModel({
  state: [],
  reducers: {
    setExams: (state: Exam[], payload: Exam[]): Exam[] => payload,
  },
});

const themeInitState = localStorage.getItem('theme');

export const theme = createModel({
  state: themeInitState ? themeInitState : 'light',
  reducers: {
    setTheme: (state: Theme, payload: Theme): Theme => payload,
  },
});
