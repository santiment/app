function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useEffect } from 'react';
import { get } from 'svelte/store'; // import { ui } from 'insights/stores/ui'

const ui = {
  subscribe: val => {
    val({
      nightMode: false
    });
    return () => {};
  }
};
const NIGHTMODE = 'nightmode';
export const THEMES = ['default', NIGHTMODE];
const DEFAULT = get(ui);
export function useTheme() {
  const [theme, setTheme] = useState(DEFAULT);
  useEffect(() => ui.subscribe(value => {
    const theme = _objectSpread({}, value);

    theme.isNightMode = theme.nightMode;
    setTheme(theme);
  }), []);
  return theme;
}
export { ui };