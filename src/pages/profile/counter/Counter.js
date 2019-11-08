import React from 'react'
import styles from './Counter.module.scss'

const Counter = ({ value }) => {
  return <span className={styles.counter}>&nbsp;({value})</span>
}

export default Counter
