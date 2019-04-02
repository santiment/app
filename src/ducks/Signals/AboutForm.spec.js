/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import AboutForm from './AboutForm'

describe('AboutForm', () => {
  xit('render correctly text component', () => {
    const constantDate = new Date('2017-06-13T04:41:20')

    /* eslint no-global-assign:off */
    Date = class extends Date {
      constructor () {
        return constantDate
      }
    }
    const wrapper = shallow(
      <InfoSignalForm onBack={() => {}} onSubmit={() => {}} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
