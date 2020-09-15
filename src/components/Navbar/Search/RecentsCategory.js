import React from 'react'
import Category from './Category'
import { Asset, propsAccessor as assetAccessor } from './AssetsCategory'

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

export function addRecent (type, item) {
  if (type !== 'Assets') return

  const { key } = assetAccessor(item)
  const newRecent = { ...item, key, type }
  return saveRecents([newRecent, ...removeRecent(newRecent)].filter(Boolean))
}

const RecentsCategory = props =>
  props.items.length ? (
    <Category
      {...props}
      title='Recently searched'
      Item={Asset}
      propsAccessor={assetAccessor}
    />
  ) : null

export default RecentsCategory
