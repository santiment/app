/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import InfoSignalForm from './InfoSignalForm'

describe('InfoSignalForm', () => {
  it('render correctly text component', () => {
    const constantDate = new Date('2017-06-13T04:41:20')

    /* eslint no-global-assign:off */
    Date = class extends Date {
      constructor () {
        return constantDate
      }
    }
    const wrapper = shallow(
      <InfoSignalForm onGoBack={() => {}} onInfoSignalSubmit={() => {}} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should be disabled, if title is empty', () => {
    const mockCb = jest.fn()
    const wrapper = mount(<InfoSignalForm onInfoSignalSubmit={mockCb} />)
    const inputTitle = wrapper.find('#title').at(1)
    inputTitle.simulate('change', {
      target: {
        value: '',
        name: 'title'
      }
    })
    console.log(wrapper.find('input'))
    expect(
      wrapper
        .find('[type="submit"]')
        .at(1)
        .prop('disabled')
    ).toBe(true)
  })
})
