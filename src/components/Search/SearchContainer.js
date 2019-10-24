import React, { useState } from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import SearchProjects from './SearchProjects'
import { TABS } from '../../pages/SearchMobilePage/SearchMobilePage'
import TrendsForm from '../Trends/TrendsForm'
import {
  getRecentAssets,
  getRecentTrends,
  addRecentAssets,
  removeRecentTrends,
  removeRecentAssets
} from '../../utils/recent'
import styles from './SearchContainer.module.scss'

const RECENT_ASSETS = 'Recently searched'
const ASSETS = 'Assets'
const TRENDING_WORDS = 'Trending words'

const Recent = ({ icon = 'clock', text, onRemove }) => (
  <div className={styles.recent}>
    <div className={styles.left}>
      <Icon type={icon} className={styles.clock} />
      {text}
    </div>
    <Icon type='close' className={styles.remove} onClick={onRemove} />
  </div>
)

export const SearchContainer = ({
  history,
  isMobile,
  className,
  selectedTab = TABS[0].index,
  inputProps,
  ...props
}) => {
  const [recentAssets, setRecentAssetSuggestions] = useState(getRecentAssets())

  function addRecentAssetSuggestions (slug) {
    setRecentAssetSuggestions(addRecentAssets(slug))
  }

  function removeRecentAssetSuggestion (slug) {
    setRecentAssetSuggestions(removeRecentAssets(slug))
  }

  return selectedTab === TABS[0].index ? (
    <SearchProjects
      {...props}
      inputProps={inputProps}
      className={cx(styles.wrapper, className)}
      iconPosition='left'
      onSuggestionSelect={({ category, item }) => {
        if (category === ASSETS || category === RECENT_ASSETS) {
          const { slug = item } = item
          addRecentAssetSuggestions(slug)
          history.push(`/projects/${slug}`)
        } else if (category === TRENDING_WORDS) {
          history.push(`/labs/trends/explore/${item}`)
        }
      }}
      emptySuggestions={
        isMobile || recentAssets.length === 0
          ? undefined
          : [
            {
              title: 'Recently searched',
              items: recentAssets,
              classes: styles,
              suggestionContent: suggestion => (
                <Recent
                  text={suggestion}
                  onRemove={e => {
                    e.stopPropagation()
                    removeRecentAssetSuggestion(suggestion)
                  }}
                />
              )
            }
          ]
      }
    />
  ) : (
    <TrendsForm
      {...props}
      {...inputProps}
      classes={{ wrapper: className, input: styles.search }}
    />
  )
}

export default withRouter(SearchContainer)
