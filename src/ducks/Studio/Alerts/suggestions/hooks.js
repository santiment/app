import { useMemo } from 'react'
import { Suggestion } from './index'

export function useSuggestions (metricValues) {
  return useMemo(
    () => {
      const suggestions = []
      const { length } = metricValues

      for (let i = 0; i < length; i++) {
        const metricValue = metricValues[i]
        const suggestion = Suggestion[metricValue.key]

        if (suggestion) {
          suggestions.push(Object.assign({}, metricValue, suggestion))
        }
      }

      return suggestions
    },
    [metricValues]
  )
}
