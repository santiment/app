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
  isPhone,
  isCentered,
  isWithPadding
}) => (
  <div className={cx(styles.wrapper, className, isCentered && styles.centered)}>
    <div className={cx(styles.header, headerClassName)}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {isPhone && (
        <Link to='/search' className={styles.search}>
          <Icon type='search' className={styles.search__icon} />
        </Link>
      )}
    </div>
    <main
      className={cx(
        styles.main,
        isWithPadding && !isCentered && styles.main_padding
      )}
    >
      {children}
    </main>
  </div>
)

Page.defaultProps = {
  isWithPadding: true
}

export default withSizes(mapSizesToProps)(Page)
