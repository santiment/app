import React from 'react'
import Like from './like.png'
import Dislike from './dislike.png'
import styles from './index.module.scss'

const UsefulSuggestion = () => (
  <div className={styles.wrapper}>
    <span className={styles.text}>Is this signal useful?</span>
    <img src={Like} alt='yes' className={styles.reaction} />
    <img src={Dislike} alt='no' className={styles.reaction} />
  </div>
)

export default UsefulSuggestion
