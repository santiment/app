import React from 'react'
import cx from 'classnames'
import Image from './Image'
import styles from './index.module.scss'

const NoDataTemplate = ({ title, desc, className }) => (
  <div className={cx(styles.wrapper, className)}>
    <Image className={styles.img} />
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
    </div>
  </div>
)

NoDataTemplate.defaultProps = {
  title: 'No matches!',
  desc:
    'The data for the word you searching for was not found. Check if it is correct or try another word/phrase.'
}

export default NoDataTemplate
