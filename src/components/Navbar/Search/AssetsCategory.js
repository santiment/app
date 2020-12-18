import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Category from './Category'
import { filterSearchableItems } from './utils'
import styles from './Category.module.scss'

const DEFAULT_SUGGESTIONS = []

const ALL_ASSETS_QUERY = gql`
  query {
    assets: allProjects(minVolume: 0) {
      id
      slug
      name
      ticker
    }
  }
`

function useAssets () {
  const { data } = useQuery(ALL_ASSETS_QUERY)
  return data ? data.assets : DEFAULT_SUGGESTIONS
}

function assetsFilterPredicate (value) {
  const searchTerm = value.toLowerCase()
  return ({ name, ticker, slug }) =>
    name.includes(searchTerm) ||
    ticker.includes(searchTerm) ||
    slug.includes(searchTerm)
}

function assetsMatchPredicate (value) {
  const searchTerm = value.toLowerCase()
  return ({ ticker }) => ticker === searchTerm
}

const useSearchableAssets = assets =>
  useMemo(
    () => {
      const { length } = assets
      const searchableAssets = new Array(length)
      for (let i = 0; i < length; i++) {
        const { name, ticker, slug } = assets[i]
        searchableAssets[i] = {
          name: name.toLowerCase(),
          ticker: ticker.toLowerCase(),
          slug: slug.toLowerCase()
        }
      }
      return searchableAssets
    },
    [assets]
  )

export const propsAccessor = ({ slug }) => ({
  key: slug,
  to: '/studio?slug=' + slug
})

export const Asset = ({ name, ticker }) => (
  <span>
    {name} <span className={styles.ticker}>{ticker}</span>
  </span>
)

const AssetsCategory = ({ searchTerm, ...props }) => {
  const assets = useAssets()
  const searchableAssets = useSearchableAssets(assets)
  const suggestions = useMemo(
    () => {
      if (!searchTerm) {
        return assets.slice(0, 5)
      }

      const { filteredItems, filteredSearchables } = filterSearchableItems(
        assetsFilterPredicate(searchTerm),
        searchableAssets,
        assets
      )
      const displayedItems = filteredItems.slice(0, 5)
      const matchedIndex = filteredSearchables.findIndex(
        assetsMatchPredicate(searchTerm)
      )

      if (matchedIndex === -1) {
        return displayedItems
      }

      const matchedAsset = filteredItems[matchedIndex]
      const displayedSet = new Set(displayedItems)

      if (displayedSet.has(matchedAsset)) {
        displayedSet.delete(matchedAsset)
      }

      return [matchedAsset, ...displayedSet].slice(0, 5)
    },
    [searchTerm, searchableAssets]
  )

  return suggestions.length ? (
    <Category
      {...props}
      className={styles.category_assets}
      title='Assets'
      items={suggestions}
      Item={Asset}
      propsAccessor={propsAccessor}
    />
  ) : null
}

export default AssetsCategory
