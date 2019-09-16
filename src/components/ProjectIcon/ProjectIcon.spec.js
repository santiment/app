/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ProjectIcon } from '.'

describe('ProjectIcon component', () => {
  it('(smoke) it should render correctly', () => {
    const icon = shallow(<ProjectIcon name='Cofound.it' />)
    expect(toJson(icon)).toMatchSnapshot()
  })

  it('SAN icon should render correctly', () => {
    const icon = shallow(<ProjectIcon name='Santiment' size='20' />)
    expect(toJson(icon)).toMatchSnapshot()
  })

  it('DAO.Casino icon should render correctly', () => {
    const icon = shallow(<ProjectIcon name='DAO.Casino' size='40' />)
    expect(toJson(icon)).toMatchSnapshot()
  })
})
