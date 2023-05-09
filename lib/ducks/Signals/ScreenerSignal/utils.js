export const FREQUENCY_REAL_TIME = {
  label: 'Real-time',
  cooldown: '5m'
};
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
};
export const WATCHLIST_DEFAULT_SIGNAL = {
  settings: {
    type: 'metric_signal',
    metric: 'price_usd',
    channel: 'telegram',
    time_window: '1d',
    operation: {
      above: 1
    }
  },
  isActive: true,
  description: 'Notify me about price changes inside the monitoring Watchlist',
  cooldown: FREQUENCY_REAL_TIME.cooldown
};
export const SCREENER_FREQUENCES = [FREQUENCY_REAL_TIME, {
  label: 'Once a day',
  cooldown: '1d'
}, {
  label: 'Once a week',
  cooldown: '7d'
}];