import React from 'react'
import { SearchWithSuggestions } from '@santiment-network/ui/Search'

const ON_CHAIN_DEFAULT = []
const suggestionContent = ({ label }) => label
const contains = (root, target) => root && root.toUpperCase().includes(target)

export function checkMatch (upperCaseSearchTerm, abbreviation, label) {
  if (!upperCaseSearchTerm) {
    return true
  }

  return (
    (abbreviation &&
      abbreviation.toUpperCase().includes(upperCaseSearchTerm)) ||
    (label && label.toUpperCase().includes(upperCaseSearchTerm))
  )
}

function predicate (searchTerm) {
  const upperCaseSearchTerm = searchTerm ? searchTerm.toUpperCase() : ''
  return ({ label, abbreviation }) =>
    contains(abbreviation, upperCaseSearchTerm) ||
    contains(label, upperCaseSearchTerm)
}

export const getMetricSuggestions = (
  categories,
  predicate,
  props,
  onChainDefault = ON_CHAIN_DEFAULT
) => {
  const suggestions = []

  for (const categoryKey in categories) {
    const category = categories[categoryKey]
    const items = categoryKey === 'On-chain' ? onChainDefault.slice() : []

    for (const group in category) {
      category[group].forEach(({ item, subitems }) =>
        items.push(
          item,
          ...subitems.filter(
            ({ checkIsVisible }) => checkIsVisible && checkIsVisible(props)
          )
        )
      )
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
  project,
  onChainDefault,
  searchPredicate,
  toggleMetric,
  ...props
}) => (
  <SearchWithSuggestions
    {...props}
    withMoreSuggestions={false}
    data={getMetricSuggestions(
      categories,
      searchPredicate,
      props,
      onChainDefault
    )}
    onSuggestionSelect={({ item }) => toggleMetric(item, project)}
    dontResetStateAfterSelection
  />
)

Search.defaultProps = {
  searchPredicate: predicate
}

export default Search
