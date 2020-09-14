import React from 'react'
import { Asset } from './AssetsCategory'

const getRecent = type => {
  const res = localStorage.getItem(type)
  return res ? res.split(',') : []
}

const removeRecent = (type, item) => {
  const items = new Set(getRecent(type))
  items.delete(item)
  return [...items]
}

const saveRecent = (type, items) => {
  const recents = items.slice(0, 5)
  localStorage.setItem(type, recents.toString())
  return recents
}

const addRecent = (type, item) =>
  saveRecent(type, [item, ...removeRecent(type, item)].filter(Boolean))

const RecentsCategory = ({ ...props }) => {
  /* const trendingWords = useTrendingWords() */

  return (
    <Category
      {...props}
      title='Recently searched'
      items={[]}
      Item={Asset}
      propsAccessor={propsAccessor}
    />
  )
}

export default RecentsCategory
