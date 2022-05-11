import React, { useEffect, useMemo, useState } from 'react'
import { queryAllProjects } from 'studio/api/project'
import Category from './Category'
import { filterSearchableItems } from './utils'
import styles from './Category.module.scss'

function assetsFilterPredicate(value) {
  const searchTerm = value.toLowerCase()
  return ({ name, ticker, slug }) =>
    name.includes(searchTerm) || ticker.includes(searchTerm) || slug.includes(searchTerm)
}

function assetsMatchPredicate(value) {
  const searchTerm = value.toLowerCase()
  return ({ ticker }) => ticker === searchTerm
}

const useSearchableAssets = (assets) =>
  useMemo(() => {
    const { length } = assets
    const searchableAssets = new Array(length)
    for (let i = 0; i < length; i++) {
      const { name, ticker, slug } = assets[i]
      searchableAssets[i] = {
        name: name.toLowerCase(),
        ticker: ticker.toLowerCase(),
        slug: slug.toLowerCase(),
      }
    }
    return searchableAssets
  }, [assets])

export const propsAccessor = ({ slug }) => ({
  key: slug,
  to: '/charts?slug=' + slug,
})

export const Asset = ({ name, ticker }) => (
  <span>
    {name} <span className={styles.ticker}>{ticker}</span>
  </span>
)

function useProjects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    queryAllProjects().then(setProjects)
  }, [])

  return projects
}

const AssetsCategory = ({ searchTerm, ...props }) => {
  const assets = useProjects()
  const searchableAssets = useSearchableAssets(assets)
  const suggestions = useMemo(() => {
    if (!searchTerm) {
      return assets.slice(0, 5)
    }

    const { filteredItems, filteredSearchables } = filterSearchableItems(
      assetsFilterPredicate(searchTerm),
      searchableAssets,
      assets,
    )
    const displayedItems = filteredItems.slice(0, 5)
    const matchedIndex = filteredSearchables.findIndex(assetsMatchPredicate(searchTerm))

    if (matchedIndex === -1) {
      return displayedItems
    }

    const matchedAsset = filteredItems[matchedIndex]
    const displayedSet = new Set(displayedItems)

    if (displayedSet.has(matchedAsset)) {
      displayedSet.delete(matchedAsset)
    }

    return [matchedAsset, ...displayedSet].slice(0, 5)
  }, [searchTerm, searchableAssets])

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
