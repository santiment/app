/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { TriggerForm } from './TriggerForm'

const allProjects = [
  {
    slug: 'santiment'
  }
]

describe('TriggerForm', () => {
  it('smoke', () => {
    const mockCb = jest.fn()
    const wrapper = mount(
      <TriggerForm
        data={allProjects}
        isTelegramConnected={true}
        onSettingsChange={mockCb}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
