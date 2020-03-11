import { alignDayMetrics } from './utils'

describe('Chart utils', () => {
  describe('alignDayMetrics', () => {
    it('In bounds of chart container', () => {
      const chartRef = {
        offsetWidth: 1240
      }

      const bars = [
        {
          metrics: new Map([['daily_active_addresses', { x: 0 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { x: 15 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { x: 30 }]])
        }
      ]

      const dayMetrics = [['daily_active_addresses']]

      const margin = 5

      alignDayMetrics({
        chartRef,
        bars,
        dayMetrics,
        margin
      })

      expect(bars).toEqual([
        {
          metrics: new Map([['daily_active_addresses', { width: 5, x: 0 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { width: 5, x: 15 }]])
        },
        {
          metrics: new Map([
            [
              'daily_active_addresses',
              {
                width: 5,
                x: 30
              }
            ]
          ])
        }
      ])
    })

    it('Out of bounds of chart container', () => {
      const chartRef = {
        offsetWidth: 500
      }

      const bars = [
        {
          metrics: new Map([['daily_active_addresses', { x: 0 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { x: 145 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { x: 290 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { x: 435 }]])
        }
      ]

      const dayMetrics = [['daily_active_addresses']]

      const margin = 5

      alignDayMetrics({
        chartRef,
        bars,
        dayMetrics,
        margin
      })

      expect(bars).toEqual([
        {
          metrics: new Map([['daily_active_addresses', { width: 135, x: 0 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { width: 135, x: 145 }]])
        },
        {
          metrics: new Map([['daily_active_addresses', { width: 135, x: 290 }]])
        },
        {
          metrics: new Map([
            [
              'daily_active_addresses',
              {
                width: 65,
                x: 435
              }
            ]
          ])
        }
      ])
    })
  })
})
