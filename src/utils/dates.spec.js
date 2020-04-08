/* eslint-env jest */
import {
  dateDifferenceInWords,
  getIntervalByTimeRange,
  getTimeIntervalFromToday
} from './dates'

const TO = new Date('2019-04-08T08:05:50.038Z')

describe('dateDifferenceInWords', () => {
  describe('specified format', () => {
    it('should return seconds string', () => {
      const FROM = new Date('2019-04-08T08:05:40.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 's' })
      ).toEqual('a few seconds ago')
    })

    it('should return minute string', () => {
      const FROM = new Date('2019-04-08T08:04:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'min' })
      ).toEqual('1 minute ago')
    })

    it('should return minutes (plural) string', () => {
      const FROM = new Date('2019-04-08T08:03:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'min' })
      ).toEqual('2 minutes ago')
    })

    it('should return hour string', () => {
      const FROM = new Date('2019-04-08T07:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'h' })
      ).toEqual('1 hour ago')
    })

    it('should return hours (plural) string', () => {
      const FROM = new Date('2019-04-08T06:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'h' })
      ).toEqual('2 hours ago')
    })

    it('should return day string', () => {
      const FROM = new Date('2019-04-07T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'd' })
      ).toEqual('1 day ago')
    })

    it('should return days (plural) string', () => {
      const FROM = new Date('2019-04-06T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'd' })
      ).toEqual('2 days ago')
    })

    it('should return month string', () => {
      const FROM = new Date('2019-03-08T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'm' })
      ).toEqual('1 month ago')
    })

    it('should return months (plural) string', () => {
      const FROM = new Date('2019-02-08T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'm' })
      ).toEqual('2 months ago')
    })

    it('should return year string', () => {
      const FROM = new Date('2018-04-08T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'y' })
      ).toEqual('1 year ago')
    })

    it('should return years (plural) string', () => {
      const FROM = new Date('2017-04-08T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'y' })
      ).toEqual('2 years ago')
    })
  })

  describe('auto format', () => {
    it('should return seconds string', () => {
      const FROM = new Date('2019-04-08T08:05:40.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        'a few seconds ago'
      )
    })

    it('should return minute string', () => {
      const FROM = new Date('2019-04-08T08:04:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '1 minute ago'
      )
    })

    it('should return minutes (plural) string', () => {
      const FROM = new Date('2019-04-08T08:03:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '2 minutes ago'
      )
    })

    it('should return hour string', () => {
      const FROM = new Date('2019-04-08T07:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '1 hour ago'
      )
    })

    it('should return hours (plural) string', () => {
      const FROM = new Date('2019-04-08T06:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '2 hours ago'
      )
    })

    it('should return day string', () => {
      const FROM = new Date('2019-04-07T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual('1 day ago')
    })

    it('should return days (plural) string', () => {
      const FROM = new Date('2019-04-06T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '2 days ago'
      )
    })

    it('should return month string', () => {
      const FROM = new Date('2019-03-08T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '1 month ago'
      )
    })

    it('should return months (plural) string', () => {
      const FROM = new Date('2019-02-08T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '2 months ago'
      )
    })

    it('should return year string', () => {
      const FROM = new Date('2018-04-08T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '1 year ago'
      )
    })

    it('should return years (plural) string', () => {
      const FROM = new Date('2017-04-08T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO })).toEqual(
        '2 years ago'
      )
    })
  })

  describe('special cases', () => {
    it('should return year difference in months', () => {
      const FROM = new Date('2018-03-08T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO, format: 'm' })
      ).toEqual('13 months ago')
    })

    it('should return days difference when month changed but 30 days not passed', () => {
      const FROM = new Date('2019-03-28T08:05:50.038Z')
      const TO_SPECIAL = new Date('2019-04-08T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO_SPECIAL, format: 'd' })
      ).toEqual('11 days ago')
    })

    it('should return days difference when month changed but 30 days not passed (auto format)', () => {
      const FROM = new Date('2019-03-28T08:05:50.038Z')
      const TO_SPECIAL = new Date('2019-04-08T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO_SPECIAL })).toEqual(
        '11 days ago'
      )
    })

    it('should return month difference when year changed but 12 months not passed', () => {
      const FROM = new Date('2018-12-08T08:05:50.038Z')
      const TO_SPECIAL = new Date('2019-01-08T08:05:50.038Z')
      expect(
        dateDifferenceInWords({ from: FROM, to: TO_SPECIAL, format: 'm' })
      ).toEqual('1 month ago')
    })

    it('should return month difference when year changed but 12 months not passed (auto format)', () => {
      const FROM = new Date('2018-12-08T08:05:50.038Z')
      const TO_SPECIAL = new Date('2019-01-08T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO_SPECIAL })).toEqual(
        '1 month ago'
      )
    })

    it('should return 11 month when it close to the 1 year difference', () => {
      const FROM = new Date('2019-01-08T08:05:50.038Z')
      const TO_SPECIAL = new Date('2019-12-29T08:05:50.038Z')
      expect(dateDifferenceInWords({ from: FROM, to: TO_SPECIAL })).toEqual(
        '11 months ago'
      )
    })
  })
})

describe('getIntervalByTimeRange', () => {
  it('7d', () => {
    expect(getIntervalByTimeRange('7d')).toEqual(
      getTimeIntervalFromToday(-7, 'd')
    )
  })

  it('1w', () => {
    expect(getIntervalByTimeRange('1w')).toEqual(
      getTimeIntervalFromToday(-7, 'd')
    )
  })

  it('3w', () => {
    expect(getIntervalByTimeRange('3w')).toEqual(
      getTimeIntervalFromToday(-3 * 7, 'd')
    )
  })

  it('1m', () => {
    expect(getIntervalByTimeRange('1m')).toEqual(
      getTimeIntervalFromToday(-1, 'm')
    )
  })

  it('12m', () => {
    expect(getIntervalByTimeRange('12m')).toEqual(
      getTimeIntervalFromToday(-12, 'm')
    )
  })

  it('1y', () => {
    expect(getIntervalByTimeRange('1y')).toEqual(
      getTimeIntervalFromToday(-1 * 12, 'm')
    )
  })

  it('3y', () => {
    expect(getIntervalByTimeRange('3y')).toEqual(
      getTimeIntervalFromToday(-3 * 12, 'm')
    )
  })
})
