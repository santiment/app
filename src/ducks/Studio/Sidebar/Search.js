import React from 'react'
import { SearchWithSuggestions } from '@santiment-network/ui/Search'

const predicate = searchTerm => {
  const upperCaseSearchTerm = searchTerm.toUpperCase()
  return ({ label, abbreviation }) => {
    if (
      abbreviation &&
      abbreviation.toUpperCase().includes(upperCaseSearchTerm)
    ) {
      return true
    }
    return label.toUpperCase().includes(upperCaseSearchTerm)
  }
}

const suggestionContent = ({ label }) => label

const getMetricSuggestions = categories => {
  const suggestions = []
  for (const categoryKey in categories) {
    const category = categories[categoryKey]
    const items = []
    for (const group in category) {
      items.push(...category[group])
    }
    suggestions.push({
      suggestionContent,
      items,
      predicate,
      title: categoryKey
    })
  }
  return suggestions
}

const Search = ({ categories, toggleMetric }) => {
  return (
    <SearchWithSuggestions
      withMoreSuggestions={false}
      data={getMetricSuggestions(categories)}
      onSuggestionSelect={({ item }) => toggleMetric(item)}
      dontResetStateAfterSelection
    />
  )
}

export default Search
