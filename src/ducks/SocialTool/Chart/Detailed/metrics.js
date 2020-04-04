import { Metric } from '../../../dataHub/metrics'
import { updateTooltipSettings } from '../../../dataHub/tooltipSettings'

export const DetailedMetric = {
  social_volume_telegram: {
    color: '#5275FF',
    name: 'Telegram',
    label: 'Telegram Social Volume'
  },
  social_volume_reddit: {
    color: '#FF5B5B',
    name: 'Reddit',
    label: 'Reddit Social Volume'
  },
  social_volume_professional_traders_chat: {
    color: '#F0BB35',
    name: 'Professional traders chat',
    label: 'Traders Chat Social Volume'
  },
  social_volume_discord: {
    color: '#8358FF',
    name: 'Discord',
    label: 'Discord Social Volume'
  },
  community_messages_count_telegram: {
    color: '#5275FF',
    name: 'Telegram',
    label: 'Community Telegram Social Volume'
  }
}

Object.keys(DetailedMetric).forEach(key => {
  DetailedMetric[key].key = key
})

Object.values(DetailedMetric).forEach(item => {
  DetailedMetric[item.key] = { ...Metric.social_volume_total, ...item }
})

updateTooltipSettings(Object.values(DetailedMetric))
