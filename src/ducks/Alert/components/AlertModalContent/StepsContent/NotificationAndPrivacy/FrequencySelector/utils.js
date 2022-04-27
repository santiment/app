import { AVAILABLE_FREQUENCIES_FOR_METRICS, FREQUENCY_MAP } from './constants'

export function getFrequencyTypes(metric) {
  const availableFrequencyTypesMap = AVAILABLE_FREQUENCIES_FOR_METRICS

  if (availableFrequencyTypesMap.has(metric)) {
    return availableFrequencyTypesMap.get(metric)
  }

  return Array.from(FREQUENCY_MAP.keys())
}

export function getFrequencyPeriods(frequencyType) {
  const frequencyTypes = Array.from(FREQUENCY_MAP.keys())
  const currentType = frequencyTypes.find((type) => type.value === frequencyType.value)

  return FREQUENCY_MAP.get(currentType)
}
