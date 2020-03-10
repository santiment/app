/* eslint-env jest */

import {
  PRICE_PERCENT_CHANGE_UP_MODEL,
  FREQUENCY_TIME_TYPE_HOURS_MODEL,
  FREQUENCY_TYPE_HOUR_MODEL,
  PRICE_VOLUME_DIFFERENCE_METRIC
} from './constants'
import { mapTriggerToFormProps, mapFormPropsToTrigger } from './utils'

const TRIGGERS = [
  {
    id: 1,
    settings: {
      channel: 'telegram',
      target: { slug: 'santiment' },
      time_window: '1d',
      type: 'metric_signal',
      operation: {
        percent_up: 5
      }
    },
    isPublic: false,
    isActive: false,
    isRepeating: true,
    cooldown: '22h',
    tags: [],
    title: undefined,
    description: undefined,
    __typename: 'Trigger'
  },
  {
    __typename: 'Trigger',
    cooldown: '22h',
    description: undefined,
    id: 1,
    isActive: false,
    isPublic: false,
    isRepeating: true,
    settings: {
      channel: 'telegram',
      metric: 'active_addresses_24h',
      operation: undefined,
      target: { slug: 'santiment' },
      time_window: '30m',
      type: 'metric_signal'
    },
    tags: [],
    title: undefined
  },
  {
    __typename: 'Trigger',
    cooldown: '22h',
    description: undefined,
    id: 1,
    isActive: false,
    isPublic: false,
    isRepeating: true,
    settings: {
      channel: 'telegram',
      metric: 'volume_usd',
      target: { slug: 'santiment' },
      threshold: 0.002,
      type: 'metric_signal'
    },
    tags: [],
    title: undefined
  },
  {
    id: 1,
    settings: {
      channel: 'telegram',
      target: { slug: 'santiment' },
      time_window: '1d',
      type: 'price_absolute_change',
      operation: {
        above: 5
      }
    },
    isPublic: false,
    isActive: false,
    isRepeating: true,
    cooldown: '22h',
    tags: [],
    title: 'Example',
    description: 'any',
    __typename: 'Trigger'
  }
]

const frequencyTimeValue = {
  value: '22',
  label: '22'
}

const FORM_PROPS = [
  {
    channels: ['Telegram'],
    cooldown: '22h',
    description: undefined,
    ethAddress: undefined,
    frequencyTimeType: { label: 'Hour(s)', value: 'h' },
    frequencyTimeValue: { label: '22', value: '22' },
    frequencyType: {
      availableTypes: ['h'],
      disabledMetrics: ['daily_active_addresses'],
      label: 'Hourly',
      value: 'h'
    },
    isActive: false,
    isPublic: false,
    isRepeating: true,
    metric: undefined,
    percentThreshold: 5,
    signalType: { label: 'Assets', value: 'assets' },
    target: { label: 'santiment', value: 'santiment' },
    targetWatchlist: undefined,
    threshold: 5,
    timeWindow: 1,
    timeWindowUnit: { label: 'Day(s)', value: 'd' },
    title: undefined,
    type: {
      dependencies: ['percentThreshold', 'timeWindow'],
      filledField: true,
      label: 'Moving up %',
      metric: 'price_percent_change',
      value: 'percent_up'
    }
  },
  {
    channels: ['Telegram'],
    cooldown: '22h',
    description: undefined,
    ethAddress: undefined,
    frequencyTimeType: { label: 'Hour(s)', value: 'h' },
    frequencyTimeValue: { label: '22', value: '22' },
    frequencyType: {
      availableTypes: ['h'],
      disabledMetrics: ['daily_active_addresses'],
      label: 'Hourly',
      value: 'h'
    },
    isActive: false,
    isPublic: false,
    isRepeating: true,
    metric: {
      description:
        'Notify me of changes in the # of addresses transacting an asset on-chain',
      label: 'Daily Active Addresses',
      metric: 'active_addresses_24h',
      type: 'metric_signal',
      value: 'daily_active_addresses'
    },
    percentThreshold: 5,
    signalType: { label: 'Assets', value: 'assets' },
    target: { label: 'santiment', value: 'santiment' },
    targetWatchlist: undefined,
    threshold: 0.002,
    timeWindow: 30,
    timeWindowUnit: { label: 'Minute(s)', value: 'm' },
    title: undefined,
    type: { value: 'metric_signal' }
  },
  {
    channels: ['Telegram'],
    cooldown: '22h',
    description: undefined,
    ethAddress: undefined,
    frequencyTimeType: { label: 'Hour(s)', value: 'h' },
    frequencyTimeValue: { label: '22', value: '22' },
    frequencyType: {
      availableTypes: ['h'],
      disabledMetrics: ['daily_active_addresses'],
      label: 'Hourly',
      value: 'h'
    },
    isActive: false,
    isPublic: false,
    isRepeating: true,
    metric: {
      description:
        'Notify me of major divergences between an asset’s price and trading volume',
      label: 'Price/volume difference',
      metric: 'volume_usd',
      type: 'metric_signal',
      value: 'price_volume_difference'
    },
    percentThreshold: 5,
    signalType: { label: 'Assets', value: 'assets' },
    target: { label: 'santiment', value: 'santiment' },
    targetWatchlist: undefined,
    threshold: 0.002,
    timeWindow: '24',
    timeWindowUnit: { label: 'Day(s)', value: 'd' },
    title: undefined,
    type: { value: 'metric_signal' }
  }
]

describe('Mapping Trigger data should work', () => {
  it('it should transform Price Percent Change trigger to form props', () => {
    expect(mapTriggerToFormProps(TRIGGERS[0])).toMatchObject(FORM_PROPS[0])
  })

  it('it should transform Daily Active Addresses trigger to form props', () => {
    expect(mapTriggerToFormProps(TRIGGERS[1])).toMatchObject(FORM_PROPS[1])
  })

  it('it should transform price_volume_difference trigger to form props', () => {
    expect(mapTriggerToFormProps(TRIGGERS[2])).toMatchObject(FORM_PROPS[2])
  })
})

describe('Mapping Form to Trigger data should work', () => {
  it('it should transform form with price_volume_difference to trigger', () => {
    expect(mapFormPropsToTrigger(FORM_PROPS[0], TRIGGERS[0])).toMatchObject(
      TRIGGERS[0]
    )
    expect(mapFormPropsToTrigger(FORM_PROPS[1], TRIGGERS[1])).toMatchObject(
      TRIGGERS[1]
    )
    expect(mapFormPropsToTrigger(FORM_PROPS[2], TRIGGERS[2])).toMatchObject(
      TRIGGERS[2]
    )
  })
})
