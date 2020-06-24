import React from 'react'
import { SearchWithSuggestions } from '@santiment-network/ui/Search'

const predicate = (searchTerm) => {
  const upperCaseSearchTerm = searchTerm.toUpperCase()
  return ({ item: { label, abbreviation } }) => {
    return (
      (abbreviation &&
        abbreviation.toUpperCase().includes(upperCaseSearchTerm)) ||
      label.toUpperCase().includes(upperCaseSearchTerm)
    )
  }
}

const suggestionContent = ({ item: { label } }) => label

export const getMetricSuggestions = (categories) => {
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
      title: categoryKey,
    })
  }
  return suggestions
}

const Search = ({ categories, toggleMetric, ...rest }) => (
  <SearchWithSuggestions
    {...rest}
    withMoreSuggestions={false}
    data={getMetricSuggestions(categories)}
    onSuggestionSelect={({ item: { item } }) => toggleMetric(item)}
    dontResetStateAfterSelection
  />
)

export default Search
