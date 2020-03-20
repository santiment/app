import { useState, useEffect } from 'react'
import { Suggestion } from './index'

const DEFAULT_SUGGESTIONS = []

export function useSuggestions (metricValues) {
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS)

  useEffect(() => {
    const newSuggestions = []
    const { length } = metricValues

    for (let i = 0; i < length; i++) {
      const metricValue = metricValues[i]
      const suggestion = Suggestion[metricValue.key]

      if (suggestion) {
        newSuggestions.push(
          Object.assign(Object.create(null), metricValue, suggestion)
        )
      }
    }

    setSuggestions(newSuggestions)
  }, metricValues)

  return suggestions
}
