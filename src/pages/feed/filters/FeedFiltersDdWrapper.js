import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import styles from './FeedFiltersDdWrapper.module.scss'

const FeedFiltersDdWrapper = ({ title, ids, onUpdate, render, className }) => {
  const [selectedValues, setSelectedValues] = useState([])
  const [data, setData] = useState([])

  useEffect(
    () => {
      if (ids.length === 0) {
        onChange([])
      } else if (data.length > 0 && selectedValues.length === 0) {
        const filtered = data.filter(({ id }) => ids.indexOf(+id) !== -1)
        setSelectedValues(filtered)
      }
    },
    [ids.length, selectedValues.length, data.length]
  )

  const onChange = value => {
    setSelectedValues(value)
    onUpdate && onUpdate(value.map(({ id }) => +id))
  }

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.title}>{title}</div>
      {render({ onChange, selectedValues, data, setData })}
    </div>
  )
}

export default FeedFiltersDdWrapper
