import React, { useState, useEffect } from 'react'
import Table from '../Table'
import { client } from '../../../../apollo'
import styles from '../index.module.scss'

export const getItemBuilder = query => id =>
  client
    .query({
      query,
      variables: {
        id
      }
    })
    .then(({ data }) => data.item)

const Recent = ({ title, rightHeader, ids, getItem, getLink, Item }) => {
  const [items, setItems] = useState(ids)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    () => {
      Promise.all(ids.map(getItem)).then(items => {
        setItems(items)
        setIsLoading(false)
      })
    },
    [ids]
  )

  return (
    <Table
      className={styles.table}
      title={title}
      rightHeader={rightHeader}
      items={items}
      isLoading={isLoading}
      getLink={getLink}
      Item={Item}
    />
  )
}

export default Recent
