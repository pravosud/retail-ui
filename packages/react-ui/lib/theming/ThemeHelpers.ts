import { isNonNullable } from '../utils';

import { Theme, ThemeIn } from './Theme';

export const exposeGetters = <T extends Record<string, any>>(theme: T): T => {
  const descriptors = Object.getOwnPropertyDescriptors(theme);
  Object.keys(descriptors).forEach((key) => {
    const descriptor = descriptors[key];
    if (typeof descriptor.get === 'function' && descriptor.configurable) {
      descriptor.enumerable = true;
      Object.defineProperty(theme, key, descriptor);
    }
  });
  return theme;
};

export const REACT_UI_DARK_THEME_KEY = '__IS_REACT_UI_DARK_THEME__';
export const REACT_UI_THEME_NAME = '__REACT_UI_THEME_NAME__';
export const REACT_UI_THEME_2022_NAME = 'THEME_2022';

export const isDarkTheme = (theme: Theme | ThemeIn): boolean => {
  // @ts-expect-error: internal value.
  return theme[REACT_UI_DARK_THEME_KEY] === true;
};

export const markAsDarkTheme = <T extends Record<string, any>>(theme: T): T => {
  return Object.create(theme, {
    [REACT_UI_DARK_THEME_KEY]: {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const markByName = <T extends Record<string, any>>(name: string, theme: T): T => {
  return Object.create(theme, {
    [REACT_UI_THEME_NAME]: {
      value: name,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const getThemeName = <T extends Record<string, any>>(theme: T): string => {
  return theme[REACT_UI_THEME_NAME] || '';
};

export const isTheme2022 = <T extends Record<string, any>>(theme: T): boolean => {
  return getThemeName(theme) === REACT_UI_THEME_2022_NAME;
};

export function findPropertyDescriptor(theme: Theme, propName: keyof Theme) {
  // TODO: Rewrite for loop.
  // TODO: Enable `no-param-reassign` rule.
  // eslint-disable-next-line no-param-reassign
  for (; isNonNullable(theme); theme = Object.getPrototypeOf(theme)) {
    if (Object.prototype.hasOwnProperty.call(theme, propName)) {
      return Object.getOwnPropertyDescriptor(theme, propName) || {};
    }
  }
  return {};
}
