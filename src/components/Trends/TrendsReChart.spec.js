/* eslint-env jest */
import { addTotal, calcSumOfMentions } from './TrendsReChart'
import { sourcesMeta as chartsMeta } from './trendsUtils'

describe('should get a sum of total mentions', () => {
  const data = [
    {
      datetime: '2019-01-23T00:00:00Z',
      discord: 5,
      marketcap: 63012207888.78794,
      priceBtc: 1,
      priceUsd: 3601.3486519850553,
      reddit: 484,
      telegram: 0,
      // total: 489,
      volume: 5433755648
    },
    {
      datetime: '2019-01-24T00:00:00Z',
      discord: 1,
      marketcap: 63012207888.78794,
      priceBtc: 1,
      priceUsd: 3601.3486519850553,
      reddit: 480,
      telegram: 2,
      // total: 483,
      volume: 5433755648
    },
    {
      datetime: '2019-01-24T00:00:00Z',
      marketcap: 63012207888.78794,
      priceBtc: 1,
      priceUsd: 3601.3486519850553,
      // total: 0,
      volume: 5433755648
    }
  ]

  it('it should work', () => {
    expect(addTotal(data)[0]['total']).toEqual(489)
    expect(addTotal(data)[1]['total']).toEqual(483)
  })

  it('should be 0, if 0 mentions', () => {
    expect(addTotal(data)[2]['total']).toEqual(0)
  })
})

describe('calcSumOfMentions', () => {
  const data = [
    {
      datetime: '2019-01-23T00:00:00Z',
      discord: 5,
      marketcap: 63012207888.78794,
      priceBtc: 1,
      priceUsd: 3601.3486519850553,
      reddit: 484,
      telegram: 0,
      total: 489,
      volume: 5433755648
    },
    {
      datetime: '2019-01-24T00:00:00Z',
      discord: 1,
      marketcap: 63012207888.78794,
      priceBtc: 1,
      priceUsd: 3601.3486519850553,
      reddit: 480,
      telegram: 2,
      total: 483,
      volume: 5433755648
    },
    {
      datetime: '2019-01-24T00:00:00Z',
      marketcap: 63012207888.78794,
      priceBtc: 1,
      priceUsd: 3601.3486519850553,
      total: 0,
      volume: 5433755648
    }
  ]

  it('it should work', () => {
    const result = calcSumOfMentions(chartsMeta)(data)
    const expected = {
      telegram: 2,
      total: 972,
      reddit: 964
    }
    expect(result['total'].value).toEqual(expected.total)
    expect(result['telegram'].value).toEqual(expected.telegram)
    expect(result['reddit'].value).toEqual(expected.reddit)
  })
})
