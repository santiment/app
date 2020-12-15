export const FREQUENCY_REAL_TIME = { label: 'Real-time', cooldown: '5m' }

export const SCREENER_DEFAULT_SIGNAL = {
  settings: {
    type: 'screener_signal',
    metric: 'social_volume_total',
    channel: 'telegram',
    operation: {
      selector: {}
    }
  },
  isActive: true,
  description: 'Notify me about changes inside the monitoring Screener',
  cooldown: FREQUENCY_REAL_TIME.cooldown
}

export const SCREENER_FREQUENCES = [
  FREQUENCY_REAL_TIME,
  { label: 'Once a day', cooldown: '1d' },
  { label: 'Once a week', cooldown: '7d' }
]
