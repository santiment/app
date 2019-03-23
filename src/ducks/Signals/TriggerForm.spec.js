/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
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
    const wrapper = shallow(
      <TriggerForm
        data={allProjects}
        isTelegramConnected={true}
        onSettingsChange={mockCb}
        getSignalBacktestingPoints={() => {}}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
