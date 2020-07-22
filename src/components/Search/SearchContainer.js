import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import SearchProjects from './SearchProjects'
import { TABS } from '../../pages/SearchMobilePage/SearchMobilePage'
import TrendsSearchForm from '../Trends/Search'
import {
  getRecentAssets,
  addRecentAssets,
  removeRecentAssets,
  clearRecentAssets
} from '../../utils/recent'
import styles from './SearchContainer.module.scss'

const RECENT_ASSETS = 'Recently searched'
const ASSETS = 'Assets'
const TRENDING_WORDS = 'Trending words'
const INPUT_ID = 'projects-search'
const EDITABLE_TAGS = ['INPUT', 'TEXTAREA']

const Recent = ({ icon = 'clock', text, onRemove }) => (
  <div className={styles.recent}>
    <div className={styles.left}>
      <Icon type={icon} className={styles.clock} />
      {text}
    </div>
    <Icon type='close-medium' className={styles.remove} onClick={onRemove} />
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
  const [isFocused, setFocus] = useState(false)
  const [recentAssets, setRecentAssetSuggestions] = useState(getRecentAssets())

  Object.assign(inputProps, { id: INPUT_ID })

  function addRecentAssetSuggestions (slug) {
    setRecentAssetSuggestions(addRecentAssets(slug))
  }

  function removeRecentAssetSuggestion (slug) {
    setRecentAssetSuggestions(removeRecentAssets(slug))
  }

  function clearRecents () {
    setRecentAssetSuggestions(clearRecentAssets())
  }

  function onFocus () {
    if (isMobile) return
    setFocus(true)
  }

  function onBlur () {
    if (isMobile) return
    setFocus(false)
  }

  useEffect(() => {
    const input = document.querySelector('#' + INPUT_ID)
    if (!input) return

    function onKeyPress (e) {
      const { code, target } = e
      if (code === 'Slash' && !EDITABLE_TAGS.includes(target.tagName)) {
        e.preventDefault()
        input.focus()
      }
    }

    window.addEventListener('keypress', onKeyPress)
    return () => window.removeEventListener('keypress', onKeyPress)
  }, [])

  return selectedTab === TABS[0].index ? (
    <SearchProjects
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      inputProps={inputProps}
      className={cx(styles.wrapper, className, isFocused && styles.focused)}
      iconPosition='left'
      onSuggestionSelect={({ category, item }) => {
        if (category === ASSETS || category === RECENT_ASSETS) {
          const { slug = item } = item
          addRecentAssetSuggestions(slug)
          if (isMobile) {
            history.push(`/projects/${slug}`)
          } else {
            history.push(`/studio?slug=${slug}`)
          }
        } else if (category === TRENDING_WORDS) {
          history.push(`/labs/trends/explore/${item}`)
        }
      }}
      emptySuggestions={
        isMobile || recentAssets.length === 0
          ? undefined
          : [
            {
              id: RECENT_ASSETS,
              title: (
                <div className={styles.recents}>
                    Recently searched
                  <Icon
                    type='history-clear'
                    className={styles.clear}
                    onClick={clearRecents}
                  />
                </div>
              ),
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
    <TrendsSearchForm
      {...props}
      {...inputProps}
      classes={{ wrapper: className, input: styles.search }}
    />
  )
}

SearchContainer.defaultProps = {
  inputProps: { id: INPUT_ID }
}

export default withRouter(SearchContainer)
