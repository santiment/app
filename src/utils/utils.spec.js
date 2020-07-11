/* eslint-env jest */
import {
  sanitizeMediumDraftHtml,
  mergeTimeseriesByKey,
  isEthStrictAddress,
  mapItemsToKeys,
  calcPercentageChange
} from './utils'

describe('sanitizeMediumDraftHtml', () => {
  it('should sanitize script tags', () => {
    const dirty =
      '<html><body><p id="demo" /><script>document.getElementById("demo").innerHTML = "Hello JavaScript!";</script></body></html>'
    const clean = '<p id="demo"></p>'

    expect(sanitizeMediumDraftHtml(dirty)).toEqual(clean)
  })

  it('should sanitize scripts in event handlers', () => {
    const dirty =
      '<button onclick="myFunction()">Click me</button><p id="demo"></p><script>function myFunction() {document.getElementById("demo").innerHTML = "Hello World";}</script>'
    const clean = 'Click me<p id="demo"></p>'

    expect(sanitizeMediumDraftHtml(dirty)).toEqual(clean)
  })
})

describe('mergeTimeseriesByKey', () => {
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

    const expected = mergeTimeseriesByKey({
      timeseries: [ts1, ts2, []],
      key: 'datetime'
    })
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

    const expected = mergeTimeseriesByKey({
      timeseries: [ts5, ts2],
      key: 'datetime'
    })
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

    const expected = mergeTimeseriesByKey({
      timeseries: [ts1, ts2],
      key: 'datetime'
    })
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

    const expected = mergeTimeseriesByKey({
      timeseries: [ts1, ts2, ts3],
      key: 'datetime'
    })
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

    const expected = mergeTimeseriesByKey({
      timeseries: [ts5, ts6],
      key: 'datetime'
    })

    expect(expected).toEqual(goodMerge)
  })

  it('should merge 3 timeseries when large one has gaps', () => {
    const goodMerge = [
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

    const expected = mergeTimeseriesByKey({
      timeseries: [ts5, ts6, ts2],
      key: 'datetime'
    })

    expect(expected).toEqual(goodMerge)
  })

  it('should merge 2 timeseries leaving the unfound datetime', () => {
    const goodMerged = [
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

    const expected = mergeTimeseriesByKey({
      timeseries: [ts2, ts4],
      key: 'datetime'
    })

    expect(expected).toEqual(goodMerged)
  })
})

describe('isEthAddress', () => {
  it('should be eth address', () => {
    expect(
      isEthStrictAddress('0x1f3df0b8390bb8e9e322972c5e75583e87608ec2')
    ).toBeTruthy()
    expect(
      isEthStrictAddress('0x140427a7d27144a4cda83bd6b9052a63b0c5b589')
    ).toBeTruthy()
  })
  it('should not be a valid eth address', () => {
    expect(isEthStrictAddress('0x1f3df0b8390bb8e9e322972c5e75582')).toBeFalsy()
    expect(
      isEthStrictAddress('1f3df0b8390bb8e9e322972c5e75583e87608ec2as')
    ).toBeFalsy()
    expect(
      isEthStrictAddress('1f3df0b8390bb8e9e322972c5e75583e87608ec2as')
    ).toBeFalsy()
    expect(isEthStrictAddress('asjdfh92ef2boejv')).toBeFalsy()
  })
})

describe('calcPercentageChange', () => {
  it('Calc percentage for 8.5 on 12', () => {
    const change = '41.18'
    const expected = calcPercentageChange(8.5, 12)
    expect(expected).toEqual(change)
  })

  it('Calc percentage for 12 on 10', () => {
    const change = '-16.67'
    const expected = calcPercentageChange(12, 10)
    expect(expected).toEqual(change)
  })

  it('Calc percentage for 13 on -2', () => {
    const change = '-115.38'
    const expected = calcPercentageChange(13, -2)
    expect(expected).toEqual(change)
  })

  it('Calc percentage for 0 on 2', () => {
    const change = 0
    const expected = calcPercentageChange(0, 2)
    expect(expected).toEqual(change)
  })
})
