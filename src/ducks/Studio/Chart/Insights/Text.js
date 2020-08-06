import React from 'react'
import styles from './Text.module.scss'

const Text = ({ text }) => (
  <div className={styles.wrapper} dangerouslySetInnerHTML={{ __html: text }} />
)

export default Text
