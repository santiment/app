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
  title: '',
  desc: ''
}

export default NoDataTemplate
