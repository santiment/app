import { AVAILABLE_FREQUENCIES_FOR_METRICS, FREQUENCY_MAP } from './constants'

export function getFrequencyTypes (metric) {
  const availableFrequencyTypesMap = AVAILABLE_FREQUENCIES_FOR_METRICS

  if (availableFrequencyTypesMap.has(metric)) {
    return availableFrequencyTypesMap.get(metric)
  }

  return Array.from(FREQUENCY_MAP.keys())
}

export function getFrequencyPeriods (frequencyType) {
  return FREQUENCY_MAP.get(frequencyType)
}
