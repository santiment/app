import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'

const Page = ({ children, title, actions, isPhone, isWithPadding }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
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
