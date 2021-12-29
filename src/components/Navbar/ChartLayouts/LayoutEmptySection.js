import React from 'react'
import { SvgNew } from '../../Illustrations/NewCard'
import CreateLayoutLink from './CreateLayoutLink'
import styles from './LayoutsEmptySection.module.scss'

const LayoutsEmptySection = () => (
  <div className={styles.wrapper}>
    <SvgNew />

    <span className={styles.description}>
      <span className={styles.link}>Create</span> your own chart layout for
    </span>
    <span>quick token analysis</span>

    <CreateLayoutLink className={styles.first} />
  </div>
)

export default LayoutsEmptySection
