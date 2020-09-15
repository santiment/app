import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Category from './Category'
import { Asset, propsAccessor as assetAccessor } from './AssetsCategory'
import styles from './Category.module.scss'

const SEARCH_RECENTS = 'SEARCH_RECENTS'

export function getRecents () {
  const savedRecents = localStorage.getItem(SEARCH_RECENTS)
  return savedRecents ? JSON.parse(savedRecents) : []
}

function saveRecents (items) {
  const recents = items.slice(0, 5)
  localStorage.setItem(SEARCH_RECENTS, JSON.stringify(items))
  return recents
}

const removeRecent = ({ key, type }) =>
  getRecents().filter(
    ({ type: itemType, key: itemKey }) => type !== itemType || key !== itemKey
  )

export const clearRecents = () => saveRecents([])

export function addRecent (type, item) {
  if (type !== 'Assets') return

  const { key } = assetAccessor(item)
  const newRecent = { ...item, key, type }
  return saveRecents([newRecent, ...removeRecent(newRecent)].filter(Boolean))
}

const Title = ({ onClear }) => (
  <div className={styles.recent}>
    Recently searched
    <Icon type='history-clear' className={styles.clear} onClick={onClear} />
  </div>
)

const RecentsCategory = ({ items, onClear, ...props }) =>
  items.length ? (
    <Category
      {...props}
      title={<Title onClear={onClear} />}
      titleKey='Recently searched'
      items={items}
      Item={Asset}
      propsAccessor={assetAccessor}
    />
  ) : null

export default RecentsCategory
