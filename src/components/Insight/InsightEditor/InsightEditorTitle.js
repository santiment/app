import React from 'react'
import AutoresizeTextarea from '../../AutoresizeTextarea'
import styles from './InsightEditor.module.scss'

const InsightEditorTitle = ({ className = '', ...props }) => {
  return (
    <AutoresizeTextarea
      className={`${styles.title} ${className}`}
      placeholder='Enter title here'
      {...props}
    />
  )
}

export default InsightEditorTitle
