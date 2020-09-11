import React from 'react'
import AssetsCategory from './AssetsCategory'
import TrendingWordsCategory from './TrendingWordsCategory'
import InsightsCategory from './InsightsCategory'
import PeopleCategory from './PeopleCategory'
import styles from './index.module.scss'

const Suggestions = ({ inputRef, ...props }) => {
  return (
    <div className={styles.tooltip}>
      <AssetsCategory {...props} />
      <TrendingWordsCategory {...props} />
      <InsightsCategory {...props} />
      <PeopleCategory {...props} />
    </div>
  )
}

export default Suggestions
