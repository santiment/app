import React from 'react'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../../utils/withSizes'
import styles from './MobileWrapper.module.scss'
import Panel from '@santiment-network/ui/Panel'

const MobileWrapper = ({ isDesktop, children }) => {
  if (isDesktop) {
    return children
  }

  return (
    <div className={styles.wrapper}>
      <Panel padding className={styles.panel}>
        {children}
      </Panel>
    </div>
  )
}

export default withSizes(mapSizesToProps)(MobileWrapper)
