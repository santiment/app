import React, { useEffect, useState, useRef } from 'react'
import AssetsCategory from './AssetsCategory'
import styles from './index.module.scss'

const Suggestions = ({ inputRef, ...props }) => {
  useEffect(() => {
    console.log(inputRef)
  }, [])

  return (
    <div className={styles.tooltip}>
      <AssetsCategory {...props} />
      <AssetsCategory {...props} />
      <AssetsCategory {...props} />
      <AssetsCategory {...props} />
    </div>
  )
}

export default Suggestions
