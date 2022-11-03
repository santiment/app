import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../../utils/withSizes'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import MobileHeader from './MobileHeader'
import styles from './MobileWrapper.module.scss'

const MobileWrapper = ({ isDesktop, children, onBack, className, withHeader = false, toggleMenu }) => {
  if (isDesktop) {
    return children
  }

  return (
    <div className={cx(styles.wrapper, className, withHeader && styles.withHeader)}>
      {withHeader && <MobileHeader toggleMenu={toggleMenu} />}
      <Panel padding className={cx(styles.panel, withHeader && styles.withHeader)}>
        {onBack && <Icon type='close-medium' className={styles.iconClose} onClick={onBack} />}
        {children}
      </Panel>
    </div>
  )
}

export default withSizes(mapSizesToProps)(MobileWrapper)
