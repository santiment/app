/* eslint-env jest */
import './tempPolyfills'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// https://github.com/felippenardi/lottie-react-web/issues/21
import 'jest-canvas-mock'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('./stores/user/utils', () => ({
  __esModule: true,
  buildRefetcher: () => () => {}
}))

jest.mock('svelte-adapter/react', () => ({
  __esModule: true,
  default: () => ({})
}))

jest.mock('./stores/user/flow.js', () => ({
  __esModule: true,
  default: () => ({}),
  loginUser: jest.fn(),
  logoutUser: jest.fn()
}))

jest.mock('./ducks/Studio/Compare/ProjectSelectTabs.js', () => ({
  __esModule: true,
  DEFAULT_TABS: [],
  default: () => <div />
}))

jest.mock('./components/Insight/comments/Comments.js', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('./components/Insight/PulseInsight/index.js', () => ({
  __esModule: true,
  default: () => <div />
}))

window.IntersectionObserver = class {}
