import React from 'react'
import cx from 'classnames'
import { TOPICS } from './topics'
import Item from './Item'
import styles from './index.module.scss'

const SocialGrid = ({ className }) => (
  <section className={cx(styles.wrapper, className)}>
    {TOPICS.map((topic, idx) => (
      <Item key={idx} topic={topic} />
    ))}
  </section>
)

export default SocialGrid
