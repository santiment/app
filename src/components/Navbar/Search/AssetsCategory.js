import React, { useMemo } from 'react'
import Category from './Category'
import { filterSearchableItems } from './utils'
import withProjects from '../../../ducks/Studio/Compare/withProjects'
import styles from './Category.module.scss'

function assetsFilterPredicate (value) {
  const searchTerm = value.toLowerCase()
  return ({ name, ticker }) =>
    name.includes(searchTerm) || ticker.includes(searchTerm)
}

function assetsMatchPredicate (value) {
  const searchTerm = value.toLowerCase()
  return ({ ticker }) => ticker === searchTerm
}

const useSearchableAssets = allProjects =>
  useMemo(
    () => {
      const { length } = allProjects
      const projects = new Array(length)
      for (let i = 0; i < length; i++) {
        const { name, ticker } = allProjects[i]
        projects[i] = {
          name: name.toLowerCase(),
          ticker: ticker.toLowerCase()
        }
      }
      return projects
    },
    [allProjects]
  )

const propsAccessor = ({ slug }) => ({
  key: slug,
  to: '/studio?slug=' + slug
})

const Asset = ({ name, ticker }) => (
  <>
    {name} <span className={styles.ticker}>{ticker}</span>
  </>
)

const AssetsCategory = ({ searchTerm, allProjects }) => {
  const searchableAssets = useSearchableAssets(allProjects)
  const suggestions = useMemo(
    () => {
      if (!searchTerm) {
        return allProjects.slice(0, 5)
      }

      const { filteredItems, filteredSearchables } = filterSearchableItems(
        assetsFilterPredicate(searchTerm),
        searchableAssets,
        allProjects
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
      title='Assets'
      items={suggestions}
      Item={Asset}
      propsAccessor={propsAccessor}
    />
  ) : null
}

export default withProjects(AssetsCategory)
