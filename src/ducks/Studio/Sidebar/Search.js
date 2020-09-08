import React from 'react'
import { SearchWithSuggestions } from '@santiment-network/ui/Search'

const ON_CHAIN_DEFAULT = []

const predicateFunction = searchTerm => {
  const upperCaseSearchTerm = searchTerm.toUpperCase()
  return ({ label, abbreviation }) => {
    return (
      (abbreviation &&
        abbreviation.toUpperCase().includes(upperCaseSearchTerm)) ||
      (label && label.toUpperCase().includes(upperCaseSearchTerm))
    )
  }
}

const suggestionContent = ({ label }) => label

export const getMetricSuggestions = ({
  categories,
  onChainDefault = ON_CHAIN_DEFAULT,
  predicate = predicateFunction
}) => {
  const suggestions = []
  for (const categoryKey in categories) {
    const category = categories[categoryKey]
    const items = categoryKey === 'On-chain' ? onChainDefault.slice() : []
    for (const group in category) {
      const groupItems = category[group]

      groupItems.forEach(groupItems => {
        const { item, subitems } = groupItems

        items.push(item)

        if (subitems && subitems.length > 0) {
          items.push(...subitems)
        }
      })
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

const Search = ({
  categories,
  toggleMetric,
  onChainDefault,
  searchPredicate,
  ...rest
}) => {
  return (
    <SearchWithSuggestions
      {...rest}
      withMoreSuggestions={false}
      data={getMetricSuggestions({
        categories,
        onChainDefault,
        predicate: searchPredicate || predicateFunction
      })}
      onSuggestionSelect={({ item }) => toggleMetric(item)}
      dontResetStateAfterSelection
    />
  )
}

export default Search
