import React from 'react'
import cx from 'classnames'
import NoDataTemplate from '../../../components/NoDataTemplate'
import styles from './index.module.scss'

const NoData = ({ description, title, className }) => (
  <NoDataTemplate
    className={cx(styles.wrapper, className)}
    desc={description}
    title={title}
  />
)

export default NoData
