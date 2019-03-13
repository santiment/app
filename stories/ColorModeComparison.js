import React from 'react'
import styles from './ColorModeComparison.module.scss'

const ColorModeComparison = ({ children }) => {
  let i = 0
  const elements = children.reduce
    ? children.reduce((acc, child) => {
        return [...acc, child, <div key={i++} className={styles.br} />]
      }, [])
    : children

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <h2 className={styles.title}>Day mode</h2>
        <div>{elements}</div>
      </div>
      <div className={`night-mode ${styles.column}`}>
        <h2 className={styles.title}>Night mode</h2>
        <div>{elements}</div>
      </div>
    </div>
  )
}

export default ColorModeComparison
