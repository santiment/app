import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../../../apollo'
import { FluidSkeleton as Skeleton } from '../../../../components/Skeleton'
import styles from './Recent.module.scss'

const getData = ({ data }) => data.item
export const getItemBuilder = (query) => (id) =>
  client
    .query({
      query,
      variables: {
        id,
      },
    })
    .then(getData)
    .catch(console.warn)

const Row = (props) => <Link {...props} className={styles.row} />
export const Column = (props) => <div {...props} className={styles.column} />

const Recent = ({ title, rightHeader, ids, getItem, getLink, Item, setHeight }) => {
  const [items, setItems] = useState(ids)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (items && items.length && !isLoading) {
      setHeight && setHeight(items.length)
    }
  }, [items, isLoading])

  useEffect(() => {
    Promise.all(ids.map(getItem)).then((items) => {
      setItems(items.flat().filter(Boolean))
      setIsLoading(false)
    })
  }, [ids])

  if (!isLoading && items.length === 0) return null

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}>{title}</div>}
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
