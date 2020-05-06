/* eslint-env jest */
import { mergeTimeseries } from './utils'

describe('mergeTimeseries', () => {
  const ts1 = [
    {
      value1: 11,
      datetime: '2018-06-20T00:00:00Z'
    },
    {
      value1: 12,
      datetime: '2018-07-20T00:00:00Z'
    }
  ]

  const ts2 = [
    {
      value2: 21,
      datetime: '2018-06-20T00:00:00Z'
    },
    {
      value2: 22,
      datetime: '2018-07-20T00:00:00Z'
    },
    {
      value2: 23,
      datetime: '2018-08-20T00:00:00Z'
    }
  ]

  const ts3 = [
    {
      value3: 31,
      datetime: '2018-06-20T00:00:00Z'
    },
    {
      value3: 32,
      datetime: '2018-07-20T00:00:00Z'
    }
  ]

  const ts4 = [
    {
      value4: 41,
      datetime: '2018-05-20T00:00:00Z'
    },
    {
      value4: 42,
      datetime: '2018-06-20T00:00:00Z'
    }
  ]

  const ts5 = [
    {
      value5: 51,
      datetime: '2018-08-20T00:00:00Z'
    },
    {
      value5: 52,
      datetime: '2018-09-20T00:00:00Z'
    },
    {
      value5: 53,
      datetime: '2018-10-20T00:00:00Z'
    }
  ]

  const ts6 = [
    {
      value6: 61,
      datetime: '2018-08-20T00:00:00Z'
    },
    {
      value6: 62,
      datetime: '2018-09-20T00:00:00Z'
    },
    {
      value6: 63,
      datetime: '2018-11-20T00:00:00Z'
    },
    {
      value6: 64,
      datetime: '2018-12-20T00:00:00Z'
    }
  ]

  it('should merge correctly and skip empty TS', () => {
    const goodMerged = [
      {
        value1: 11,
        value2: 21,
        datetime: '2018-06-20T00:00:00Z'
      },
      {
        value1: 12,
        value2: 22,
        datetime: '2018-07-20T00:00:00Z'
      },
      {
        value2: 23,
        datetime: '2018-08-20T00:00:00Z'
      }
    ]

    const expected = mergeTimeseries([ts1, ts2, []])
    expect(expected).toEqual(goodMerged)
  })

  it('should append longest array with missing new TS and merge existing', () => {
    const goodMerged = [
      {
        value2: 21,
        datetime: '2018-06-20T00:00:00Z'
      },
      {
        value2: 22,
        datetime: '2018-07-20T00:00:00Z'
      },
      {
        value2: 23,
        value5: 51,
        datetime: '2018-08-20T00:00:00Z'
      },
      {
        value5: 52,
        datetime: '2018-09-20T00:00:00Z'
      },
      {
        value5: 53,
        datetime: '2018-10-20T00:00:00Z'
      }
    ]

    const expected = mergeTimeseries([ts5, ts2])
    expect(expected).toEqual(goodMerged)
  })

  it('should merge 2 timeseries properly', () => {
    const goodMerged = [
      {
        value1: 11,
        value2: 21,
        datetime: '2018-06-20T00:00:00Z'
      },
      {
        value1: 12,
        value2: 22,
        datetime: '2018-07-20T00:00:00Z'
      },
      {
        value2: 23,
        datetime: '2018-08-20T00:00:00Z'
      }
    ]

    const expected = mergeTimeseries([ts1, ts2])
    expect(expected).toEqual(goodMerged)
  })

  it('should merge timeseries properly', () => {
    const goodMerged = [
      {
        value1: 11,
        value2: 21,
        value3: 31,
        datetime: '2018-06-20T00:00:00Z'
      },
      {
        value1: 12,
        value2: 22,
        value3: 32,
        datetime: '2018-07-20T00:00:00Z'
      },
      {
        value2: 23,
        datetime: '2018-08-20T00:00:00Z'
      }
    ]

    const expected = mergeTimeseries([ts1, ts2, ts3])

    expect(expected).toEqual(goodMerged)
  })
  it('should merge 2 timeseries when large one has gaps', () => {
    const goodMerge = [
      {
        value5: 51,
        value6: 61,
        datetime: '2018-08-20T00:00:00Z'
      },
      {
        value5: 52,
        value6: 62,
        datetime: '2018-09-20T00:00:00Z'
      },
      {
        value5: 53,
        datetime: '2018-10-20T00:00:00Z'
      },
      {
        value6: 63,
        datetime: '2018-11-20T00:00:00Z'
      },
      {
        value6: 64,
        datetime: '2018-12-20T00:00:00Z'
      }
    ]

    const expected = mergeTimeseries([ts5, ts6])

    expect(expected).toEqual(goodMerge)
  })

  it('should merge 3 timeseries when large one has gaps', () => {
    const goodMerge = [
      {
        value2: 21,
        datetime: '2018-06-20T00:00:00Z'
      },
      {
        value2: 22,
        datetime: '2018-07-20T00:00:00Z'
      },
      {
        value2: 23,
        value5: 51,
        value6: 61,
        datetime: '2018-08-20T00:00:00Z'
      },
      {
        value5: 52,
        value6: 62,
        datetime: '2018-09-20T00:00:00Z'
      },
      {
        value5: 53,
        datetime: '2018-10-20T00:00:00Z'
      },
      {
        value6: 63,
        datetime: '2018-11-20T00:00:00Z'
      },
      {
        value6: 64,
        datetime: '2018-12-20T00:00:00Z'
      }
    ]

    const expected = mergeTimeseries([ts5, ts6, ts2])

    expect(expected).toEqual(goodMerge)
  })

  it('should merge 2 timeseries leaving the unfound datetime', () => {
    const goodMerged = [
      {
        value4: 41,
        datetime: '2018-05-20T00:00:00Z'
      },
      {
        value2: 21,
        value4: 42,
        datetime: '2018-06-20T00:00:00Z'
      },
      {
        value2: 22,
        datetime: '2018-07-20T00:00:00Z'
      },
      {
        value2: 23,
        datetime: '2018-08-20T00:00:00Z'
      }
    ]

    const expected = mergeTimeseries([ts2, ts4])

    expect(expected).toEqual(goodMerged)
  })
})
