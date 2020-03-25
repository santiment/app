import React, { useState } from 'react'
import cx from 'classnames'
import Dropdown from '@santiment-network/ui/Dropdown'
import Settings from '../../../Studio/Header/Settings'
import PaywallInfo from '../../../Studio/Chart/PaywallInfo'
import styles from './index.module.scss'

const OPTIONS = ['BTC/USD', 'ETH/USD']

const dropdownClasses = {
  wrapper: styles.dropdown
}

const getPriceOptions = asset => {
  if (!asset) {
    return OPTIONS
  }

  const { ticker } = asset
  if (ticker === 'BTC' || ticker === 'ETH') {
    return OPTIONS
  }

  return [...OPTIONS, `${ticker}/USD`]
}

const Header = ({ className, boundaries, ...props }) => {
  const [options, setOptions] = useState(getPriceOptions())
  const [selected, setSelected] = useState(options[0])

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.left}>
        <h3 className={styles.title}>Social volume score</h3>
        <PaywallInfo boundaries={boundaries} metrics={props.metrics} />
      </div>
      <div className={styles.right}>
        <Dropdown
          selected={selected}
          options={options}
          classes={dropdownClasses}
          onSelect={option => setSelected(option)}
        />
        <Settings {...props} />
      </div>
    </div>
  )
}

export default Header
