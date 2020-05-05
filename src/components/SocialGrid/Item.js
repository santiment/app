import React from 'react'
import styles from './Item.module.scss'

const Item = ({ topic }) => (
  <article className={styles.wrapper}>{topic}</article>
)

export default Item
