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

  useEffect(
    () => {
      Promise.all(ids.map(getItem)).then(setItems)
    },
    [ids]
  )

  return (
    <Table
      className={styles.table}
      title={title}
      rightHeader={rightHeader}
      items={items}
      getLink={getLink}
      Item={Item}
    />
  )
}

export default Recent
