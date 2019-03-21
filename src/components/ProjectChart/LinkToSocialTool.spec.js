/* eslint-env jest */
import React from 'react'
import LinkToSocialTool from './LinkToSocialTool'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe('LinkToSocialTool', () => {
  it('Smoke', () => {
    const project = {
      name: 'Santiment Network Token',
      ticker: 'SAN',
      slug: 'santiment'
    }
    const wrapper = shallow(<LinkToSocialTool {...project} />)
    expect(wrapper.find('Link').props().to).toEqual(
      '/labs/trends/explore/santiment%20OR%20SAN%20OR%20Santiment%20Network%20Token?asset=santiment'
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("LinkToSocialTool, if project doesn't have name", () => {
    const project = {
      name: null,
      ticker: 'SAN',
      slug: 'santiment'
    }
    const wrapper = shallow(<LinkToSocialTool {...project} />)
    expect(wrapper.find('Link').props().to).toEqual(
      '/labs/trends/explore/santiment%20OR%20SAN?asset=santiment'
    )

    const projectWithoutTicker = {
      name: null,
      ticker: null,
      slug: 'santiment'
    }
    const wrapper2 = shallow(<LinkToSocialTool {...projectWithoutTicker} />)
    expect(wrapper2.find('Link').props().to).toEqual(
      '/labs/trends/explore/santiment?asset=santiment'
    )
  })
})
