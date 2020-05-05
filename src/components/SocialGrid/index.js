import React from 'react'
import cx from 'classnames'
import { SETTINGS } from './topics'
import { updateHistory } from '../../utils/utils'
import { TOPICS } from './topics'
import Item from './Item'
import styles from './index.module.scss'

const SocialGrid = ({ className, onTopicClick }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      {TOPICS.map((topic, idx) => (
        <Item
          key={idx}
          topic={topic}
          onTopicClick={onTopicClick}
          settings={SETTINGS}
        />
      ))}
    </section>
  )
}

export default SocialGrid
