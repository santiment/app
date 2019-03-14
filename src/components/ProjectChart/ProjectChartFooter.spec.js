/* eslint-env jest */
import React from 'react'
import { LinkToSocialTool } from './ProjectChartFooter'
import toJson from 'enzyme-to-json'
import { mount, shallow } from 'enzyme'

describe('ProjectChartFooter', () => {
  it('LinkToSocialTool', () => {
    const project = {
      name: 'Santiment Network Token',
      ticker: 'SAN',
      slug: 'santiment'
    }
    const wrapper = shallow(<LinkToSocialTool {...project} />)
    expect(wrapper.props().to).toEqual(
      '/labs/trends/explore/santiment%20OR%20SAN%20OR%20Santiment%20Network%20Token'
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
    expect(wrapper.props().to).toEqual(
      '/labs/trends/explore/santiment%20OR%20SAN'
    )

    const projectWithoutTicker = {
      name: null,
      ticker: null,
      slug: 'santiment'
    }
    const wrapper2 = shallow(<LinkToSocialTool {...projectWithoutTicker} />)
    expect(wrapper2.props().to).toEqual('/labs/trends/explore/santiment')
  })
})
