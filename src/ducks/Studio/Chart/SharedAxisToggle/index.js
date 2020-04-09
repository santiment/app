import React from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './index.module.scss'

export default ({
  className,
  isDomainGroupingActive,
  setIsDomainGroupingActive
}) => {
  function toggleDomainGrouping () {
    setIsDomainGroupingActive(state => !state)
  }

  return (
    <div
      className={cx(styles.wrapper, className)}
      onClick={toggleDomainGrouping}
    >
      Shared axis
      <Toggle isActive={isDomainGroupingActive} className={styles.toggle} />
    </div>
  )
}
