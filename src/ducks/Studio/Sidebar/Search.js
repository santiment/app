import React, { useMemo } from 'react'
import { SearchWithSuggestions } from '@santiment-network/ui/Search'
import { useIsBetaMode } from '../../../stores/ui'

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
  isBeta = false,
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

        if (!item.isBeta || isBeta) {
          items.push(item)
        }

        if (subitems && subitems.length > 0) {
          subitems.forEach(subItem => {
            if (!subItem.isBeta || isBeta) {
              items.push(subItem)
            }
          })
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
  const isBeta = useIsBetaMode()

  const data = useMemo(
    () => {
      return getMetricSuggestions({
        categories,
        onChainDefault,
        isBeta,
        predicate: searchPredicate || predicateFunction
      })
    },
    [categories, isBeta, onChainDefault, searchPredicate]
  )

  return (
    <SearchWithSuggestions
      {...rest}
      withMoreSuggestions={false}
      data={data}
      onSuggestionSelect={({ item }) => toggleMetric(item)}
      dontResetStateAfterSelection
    />
  )
}

export default Search
