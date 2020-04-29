import { TooltipSetting, FORMATTER } from '../../../../dataHub/tooltipSettings'

export const TopHolderMetric = {
  holders_distribution_0_to_0001: {
    label: '[0 - 0.001) coins',
    queryKey: 'holders_distribution_0_to_0.001'
  },
  holders_distribution_0001_to_001: {
    label: '[0.001 - 0.01) coins',
    queryKey: 'holders_distribution_0.001_to_0.01'
  },
  holders_distribution_001_to_01: {
    label: '[0.01 - 0.1) coins',
    queryKey: 'holders_distribution_0.01_to_0.1'
  },
  holders_distribution_01_to_1: {
    label: '[0.1 - 1) coins',
    queryKey: 'holders_distribution_0.1_to_1'
  },
  holders_distribution_1_to_10: {
    label: '[1 - 10) coins'
  },
  holders_distribution_10_to_100: {
    label: '[10 - 100) coins'
  },
  holders_distribution_100_to_1k: {
    label: '[100 - 1,000) coins'
  },
  holders_distribution_1k_to_10k: {
    label: '[1,000 - 10,000) coins'
  },
  holders_distribution_10k_to_100k: {
    label: '[10,000 - 100,000) coins'
  },
  holders_distribution_100k_to_1M: {
    label: '[100,000  - 1,000,000) coins'
  },
  holders_distribution_1M_to_10M: {
    label: '[1,000,000 - 10,000,000) coins'
  },
  holders_distribution_10M_to_inf: {
    label: '[10,000,000 - infinity) coins'
  }
}

Object.keys(TopHolderMetric).forEach(key => {
  TopHolderMetric[key].key = key
  TopHolderMetric[key].node = 'line'
})

Object.values(TopHolderMetric).forEach(({ key, label }) => {
  TooltipSetting[key] = {
    label,
    formatter: FORMATTER
  }
})

export const TOP_HOLDER_METRICS = Object.values(TopHolderMetric)
