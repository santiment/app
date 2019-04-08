/* eslint-env jest */
import { getTimeFromTo } from './dates'

const TO = new Date('2019-04-08T08:05:50.038Z')

describe('getTimeFromTo', () => {
  describe('specified format', () => {
    it('should return seconds string', () => {
      const FROM = new Date('2019-04-08T08:05:40.038Z')
      expect(getTimeFromTo(FROM, TO, 's')).toEqual('a few seconds ago')
    })

    it('should return minute string', () => {
      const FROM = new Date('2019-04-08T08:04:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'min')).toEqual('a minute ago')
    })

    it('should return minutes (plural) string', () => {
      const FROM = new Date('2019-04-08T08:03:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'min')).toEqual('2 minutes ago')
    })

    it('should return hour string', () => {
      const FROM = new Date('2019-04-08T07:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'h')).toEqual('an hour ago')
    })

    it('should return hours (plural) string', () => {
      const FROM = new Date('2019-04-08T06:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'h')).toEqual('2 hours ago')
    })

    it('should return day string', () => {
      const FROM = new Date('2019-04-07T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'd')).toEqual('a day ago')
    })

    it('should return days (plural) string', () => {
      const FROM = new Date('2019-04-06T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'd')).toEqual('2 days ago')
    })

    it('should return month string', () => {
      const FROM = new Date('2019-03-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'm')).toEqual('a month ago')
    })

    it('should return months (plural) string', () => {
      const FROM = new Date('2019-02-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'm')).toEqual('2 months ago')
    })

    it('should return year string', () => {
      const FROM = new Date('2018-04-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'y')).toEqual('a year ago')
    })

    it('should return months (plural) string', () => {
      const FROM = new Date('2017-04-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO, 'y')).toEqual('2 years ago')
    })
  })

  describe('auto format', () => {
    it('should return seconds string', () => {
      const FROM = new Date('2019-04-08T08:05:40.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('a few seconds ago')
    })

    it('should return minute string', () => {
      const FROM = new Date('2019-04-08T08:04:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('a minute ago')
    })

    it('should return minutes (plural) string', () => {
      const FROM = new Date('2019-04-08T08:03:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('2 minutes ago')
    })

    it('should return hour string', () => {
      const FROM = new Date('2019-04-08T07:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('an hour ago')
    })

    it('should return hours (plural) string', () => {
      const FROM = new Date('2019-04-08T06:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('2 hours ago')
    })

    it('should return day string', () => {
      const FROM = new Date('2019-04-07T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('a day ago')
    })

    it('should return days (plural) string', () => {
      const FROM = new Date('2019-04-06T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('2 days ago')
    })

    it('should return month string', () => {
      const FROM = new Date('2019-03-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('a month ago')
    })

    it('should return months (plural) string', () => {
      const FROM = new Date('2019-02-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('2 months ago')
    })

    it('should return year string', () => {
      const FROM = new Date('2018-04-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('a year ago')
    })

    it('should return months (plural) string', () => {
      const FROM = new Date('2017-04-08T08:05:50.038Z')
      expect(getTimeFromTo(FROM, TO)).toEqual('2 years ago')
    })
  })
})
