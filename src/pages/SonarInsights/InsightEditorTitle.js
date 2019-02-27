import React from 'react'
import AutoresizeTextarea from './AutoresizeTextarea'
import styles from './InsightsEditor.module.scss'

const InsightEditorTitle = ({ className = '', ...props }) => {
  return (
    <AutoresizeTextarea
      className={`${styles.title} ${className}`}
      placeholder="Insight's title"
      {...props}
    />
  )
}

export default InsightEditorTitle
