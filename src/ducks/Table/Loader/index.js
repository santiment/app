import React from 'react'
import cx from 'classnames'
import Skeleton from '../../../components/Skeleton/Skeleton'
import styles from './index.module.scss'

const Loader = ({ isLoading, classes = {}, repeat }) => (
  <div className={cx(styles.loader, classes.wrapper)}>
    <Skeleton
      className={cx(styles.skeleton, classes.row)}
      show={isLoading}
      repeat={repeat}
    />
  </div>
)

export default Loader
