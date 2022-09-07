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
  isWithPadding,
  mainClassName,
}) => (
  <div className={cx(styles.wrapper, className, isCentered && styles.centered)}>
    <div className={cx(styles.header, isPhone && 'row v-center justify', headerClassName)}>
      {title && <h1 className='h4 txt-m nowrap mrg-l mrg--r'>{title}</h1>}
      {isPhone && (
        <Link to='/search'>
          <Icon type='search' width='18' height='18' className={styles.searchIcon} />
        </Link>
      )}
    </div>
    <main
      className={cx(
        styles.main,
        isWithPadding && !isCentered && styles.main_padding,
        mainClassName,
      )}
    >
      {children}
    </main>
  </div>
)

Page.defaultProps = {
  isWithPadding: true,
}

export default withSizes(mapSizesToProps)(Page)
