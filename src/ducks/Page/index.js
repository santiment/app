import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'

const Page = ({
  className,
  headerClassName,
  children,
  title,
  actions,
  isPhone,
  isWithPadding
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.header, headerClassName)}>
        <h1 className={styles.title}>{title}</h1>
        {actions}
        {isPhone && <Icon type='search' />}
      </div>
      <main className={cx(isWithPadding && styles.main)}>{children}</main>
    </div>
  )
}
Page.defaulProps = {
  isWithPadding: true
}

export default Page
