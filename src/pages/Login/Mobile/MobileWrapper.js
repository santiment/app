import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../../utils/withSizes'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import styles from './MobileWrapper.module.scss'

const MobileWrapper = ({ isDesktop, children, onBack, className }) => {
  if (isDesktop) {
    return children
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <Panel padding className={styles.panel}>
        <Icon type='close' className={styles.iconClose} onClick={onBack} />
        {children}
      </Panel>
    </div>
  )
}

export default withSizes(mapSizesToProps)(MobileWrapper)
