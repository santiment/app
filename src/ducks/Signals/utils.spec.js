/* eslint-env jest */
import {
  mapTriggerToFormProps,
  mapFormPropsToTrigger,
  pricePercentChangeUp
} from './utils'

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
    cooldown: '30m',
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
    cooldown: '30m',
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
    cooldown: '30m',
    tags: [],
    title: 'Example',
    description: 'any',
    __typename: 'Trigger'
  }
]

const FORM_PROPS = [
  {
    cooldown: '30m',
    percentThreshold: 5,
    isRepeating: true,
    target: { value: 'santiment', label: 'santiment' },
    timeWindow: 1,
    timeWindowUnit: { label: 'days', value: 'd' },
    type: pricePercentChangeUp,
    metric: { label: 'Price', value: 'price' },
    channels: ['telegram']
  },
  {
    cooldown: '30m',
    percentThreshold: 6,
    isRepeating: true,
    target: { value: 'santiment', label: 'santiment' },
    timeWindow: 30,
    timeWindowUnit: { label: 'minutes', value: 'm' },
    type: { label: 'Daily Active Addresses', value: 'daily_active_addresses' },
    metric: {
      label: 'Daily Active Addresses',
      value: 'daily_active_addresses'
    },
    channels: ['telegram']
  },
  {
    cooldown: '30m',
    threshold: 0.002,
    isRepeating: true,
    target: { value: 'santiment', label: 'santiment' },
    type: {
      label: 'Price/volume difference',
      value: 'price_volume_difference'
    },
    metric: {
      label: 'Price/volume difference',
      value: 'price_volume_difference'
    },
    channels: ['telegram']
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
