import React, { useEffect } from 'react'
import AssetsCategory from './AssetsCategory'
import TrendingWordsCategory from './TrendingWordsCategory'
import styles from './index.module.scss'

const Suggestions = ({ inputRef, ...props }) => {
  return (
    <div className={styles.tooltip}>
      <AssetsCategory {...props} />
      <TrendingWordsCategory {...props} />
      <AssetsCategory {...props} />
    </div>
  )
}

export default Suggestions
