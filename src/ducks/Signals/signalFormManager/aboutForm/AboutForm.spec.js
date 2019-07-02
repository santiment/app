/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import AboutForm from './AboutForm'

describe('AboutForm', () => {
  it('render correctly text component', () => {
    const triggerAboutFormData = {
      title: 'Title of Trigger',
      description: 'Custom Description'
    }
    const wrapper = shallow(
      <AboutForm
        triggerMeta={triggerAboutFormData}
        onBack={() => {}}
        onSubmit={() => {}}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
