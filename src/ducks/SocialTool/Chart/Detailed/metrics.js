import { Metric } from '../../../dataHub/metrics'
import { updateTooltipSettings } from '../../../dataHub/tooltipSettings'

export const DetailedMetric = {
  social_volume_telegram: {
    color: '#5275FF',
    name: 'Telegram',
    label: 'Telegram Social Volume',
  },
  social_volume_reddit: {
    color: '#FF5B5B',
    name: 'Reddit',
    label: 'Reddit Social Volume',
  },
  social_volume_twitter: {
    color: '#1DA1F2',
    name: 'Twitter',
    label: 'Twitter Social Volume',
  },
  community_messages_count_telegram: {
    color: '#5275FF',
    name: 'Telegram',
    label: 'Community Telegram Social Volume',
  },
}

Object.keys(DetailedMetric).forEach((key) => {
  DetailedMetric[key].key = key
})

Object.values(DetailedMetric).forEach((item) => {
  DetailedMetric[item.key] = { ...Metric.social_volume_total, ...item }
})

updateTooltipSettings(Object.values(DetailedMetric))
