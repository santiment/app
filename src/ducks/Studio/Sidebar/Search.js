import React from 'react'
import { SearchWithSuggestions } from '@santiment-network/ui/Search'

const ON_CHAIN_DEFAULT = []

export const checkMatch = (upperCaseSearchTerm, abbreviation, label) => {
  if (!upperCaseSearchTerm) {
    return true
  }

  return (
    (abbreviation &&
      abbreviation.toUpperCase().includes(upperCaseSearchTerm)) ||
    (label && label.toUpperCase().includes(upperCaseSearchTerm))
  )
}

const predicateFunction = searchTerm => {
  const upperCaseSearchTerm = searchTerm ? searchTerm.toUpperCase() : ''
  return ({ label, abbreviation }) => {
    return checkMatch(upperCaseSearchTerm, abbreviation, label)
  }
}

const suggestionContent = ({ label }) => label

export const getMetricSuggestions = ({
  categories,
  onChainDefault = ON_CHAIN_DEFAULT,
  predicate = predicateFunction
}) => {
  const suggestions = []

  const predicateChecker = predicate()

  for (const categoryKey in categories) {
    const category = categories[categoryKey]
    const items =
      categoryKey === 'On-chain'
        ? onChainDefault.slice().filter(predicateChecker)
        : []
    for (const group in category) {
      const list = category[group]

      list.forEach(groupItems => {
        const { item, subitems } = groupItems

        if (predicateChecker(item)) {
          items.push(item)
        }

        if (subitems && subitems.length > 0) {
          items.push(...subitems.filter(predicateChecker))
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
