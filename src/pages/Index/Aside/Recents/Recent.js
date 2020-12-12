import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../../../apollo'
import { FluidSkeleton as Skeleton } from '../../../../components/Skeleton'
import styles from './Recent.module.scss'

export const getItemBuilder = query => id =>
  client
    .query({
      query,
      variables: {
        id
      }
    })
    .then(({ data }) => data.item)

const Row = props => <Link {...props} className={styles.row} />
export const Column = props => <div {...props} className={styles.column} />

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
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.headers}>
        <div>Name</div>
        <div>{rightHeader}</div>
      </div>
      <div className={styles.rows}>
        {items.map((item, i) => (
          <Row key={i} to={getLink(item)}>
            {Item(item)}
          </Row>
        ))}
        <Skeleton show={isLoading} className={styles.skeleton} />
      </div>
    </div>
  )
}

export default Recent
