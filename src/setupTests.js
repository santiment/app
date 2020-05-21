/* eslint-env jest */
import './tempPolyfills'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('svelte-adapter/react', () => ({
  __esModule: true,
  default: () => ({})
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
