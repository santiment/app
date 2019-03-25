/* eslint-env jest */
import { getInsightIdFromSEOLink, getSEOLinkFromIdAndTitle } from './utils'

const insights = {
  small: {
    id: 0,
    title: 'How are you?',
    seo: 'how-are-you%3F-0'
  },
  strange: {
    id: 1,
    title: 'ThIS -- a., &&lre you?-0',
    seo: 'this----a.%2C-%26%26lre-you%3F-0-1'
  }
}

describe('getSEOLinkFromIdAndTitle', () => {
  it('should transform small title', () => {
    const { id, title, seo } = insights.small
    expect(getSEOLinkFromIdAndTitle(id, title)).toEqual(seo)
  })

  it('should transform strange title', () => {
    const { id, title, seo } = insights.strange
    expect(getSEOLinkFromIdAndTitle(id, title)).toEqual(seo)
  })
})

describe('getInsightIdFromSEOLink', () => {
  it('should get id from small seo link', () => {
    const { id, seo } = insights.small
    expect(getInsightIdFromSEOLink(seo)).toEqual(id)
  })

  it('should get id from strange seo link', () => {
    const { id, seo } = insights.strange
    expect(getInsightIdFromSEOLink(seo)).toEqual(id)
  })
})
