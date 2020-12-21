import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './index.module.scss'

const Page = ({
  className,
  headerClassName,
  children,
  title,
  actions,
  isPhone,
  isWithPadding
}) => (
  <div className={cx(styles.wrapper, className)}>
    <div className={cx(styles.header, headerClassName)}>
      <h1 className={styles.title}>{title}</h1>
      {actions}
      {isPhone && (
        <Link to='/search' className={styles.search}>
          <Icon type='search' className={styles.search__icon} />
        </Link>
      )}
    </div>
    <main className={cx(isWithPadding && styles.main)}>{children}</main>
  </div>
)

Page.defaulProps = {
  isWithPadding: true
}

export default withSizes(mapSizesToProps)(Page)
