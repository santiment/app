/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ProjectIcon } from './ProjectIcon'

describe('ProjectIcon component', () => {
  it('(smoke) it should render correctly', () => {
    const icon = shallow(<ProjectIcon slug='bitcoin' />)
    expect(toJson(icon)).toMatchSnapshot()
  })

  it('SAN icon should render correctly', () => {
    const icon = shallow(<ProjectIcon slug='santiment' size='16' />)
    expect(toJson(icon)).toMatchSnapshot()
  })

  it('DAO.Casino icon should render correctly', () => {
    const icon = shallow(<ProjectIcon slug='monero' size='40' />)
    expect(toJson(icon)).toMatchSnapshot()
  })
})
