/* eslint-env jest */

import {
  PRICE_PERCENT_CHANGE_UP_MODEL,
  DEFAULT_FREQUENCY_TIME_TYPE_MODEL,
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
      type: 'price_percent_change',
      operation: {
        percent_up: 5
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
  },
  {
    id: 1,
    settings: {
      channel: 'telegram',
      percent_threshold: 6,
      target: { slug: 'santiment' },
      time_window: '30m',
      type: 'daily_active_addresses'
    },
    isPublic: false,
    isActive: false,
    isRepeating: true,
    cooldown: '22h',
    tags: [],
    title: 'Example',
    description: 'any',
    __typename: 'Trigger'
  },
  {
    id: 1,
    settings: {
      channel: 'telegram',
      threshold: 0.002,
      target: { slug: 'santiment' },
      type: 'price_volume_difference'
    },
    isPublic: false,
    isActive: false,
    isRepeating: true,
    cooldown: '22h',
    tags: [],
    title: 'Example',
    description: 'any',
    __typename: 'Trigger'
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
    cooldown: '22h',
    frequencyType: { ...FREQUENCY_TYPE_HOUR_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTimeValue },
    percentThreshold: 5,
    isRepeating: true,
    target: { value: 'santiment', label: 'santiment' },
    timeWindow: 1,
    timeWindowUnit: { label: 'Days', value: 'd' },
    type: { ...PRICE_PERCENT_CHANGE_UP_MODEL },
    metric: { label: 'Price', value: 'price' },
    channels: ['Telegram']
  },
  {
    cooldown: '22h',
    frequencyType: { ...FREQUENCY_TYPE_HOUR_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTimeValue },
    percentThreshold: 6,
    isRepeating: true,
    target: { value: 'santiment', label: 'santiment' },
    timeWindow: 30,
    timeWindowUnit: { label: 'Minutes', value: 'm' },
    metric: {
      label: 'Daily Active Addresses',
      value: 'daily_active_addresses'
    },
    type: {
      metric: 'daily_active_addresses'
    },
    channels: ['Telegram']
  },
  {
    cooldown: '22h',
    frequencyType: { ...FREQUENCY_TYPE_HOUR_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTimeValue },
    threshold: 0.002,
    isRepeating: true,
    target: { value: 'santiment', label: 'santiment' },
    metric: { ...PRICE_VOLUME_DIFFERENCE_METRIC },
    type: {
      metric: 'price_volume_difference'
    },
    channels: ['Telegram']
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
