import React from 'react'
import AutoresizeTextarea from '../../AutoresizeTextarea'
import styles from './InsightEditor.module.scss'

const InsightEditorTitle = ({ className = '', ...props }) => {
  return (
    <AutoresizeTextarea
      className={`${styles.title} ${className}`}
      placeholder='Name your insight'
      {...props}
    />
  )
}

export default InsightEditorTitle
