/* eslint-env jest */
import './tempPolyfills';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; // https://github.com/felippenardi/lottie-react-web/issues/21

import 'jest-canvas-mock';
Enzyme.configure({
  adapter: new Adapter()
});
jest.mock('./stores/user/utils', () => ({
  __esModule: true,
  buildRefetcher: () => () => {}
}));
jest.mock('svelte-adapter/react', () => ({
  __esModule: true,
  default: () => ({})
}));
jest.mock('./stores/user', () => ({
  __esModule: true,
  default: () => ({}),
  useUser: () => {}
}));
jest.mock('./stores/ui/theme', () => ({
  __esModule: true,
  default: () => ({}),
  useTheme: () => {}
}));
jest.mock('./stores/user/flow.js', () => ({
  __esModule: true,
  default: () => ({}),
  loginUser: jest.fn(),
  logoutUser: jest.fn()
}));
jest.mock('./ducks/Studio/Compare/ProjectSelectTabs.js', () => ({
  __esModule: true,
  DEFAULT_TABS: [],
  default: () => /*#__PURE__*/React.createElement("div", null)
}));
jest.mock('san-webkit/lib/analytics', () => ({
  track: () => {}
}), {
  virtual: true
});
jest.mock('san-webkit/lib/analytics/twitter', () => ({
  initTwitterPixel: () => {},
  TwitterTrackActions: {}
}), {
  virtual: true
});
window.IntersectionObserver = class {};