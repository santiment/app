import React, { useRef } from 'react'
import Settings from './Settings'
import Template from '../Template'
import styles from './index.module.scss'

export default props => {
  const headerRef = useRef(null)

  return (
    <div className={styles.wrapper} ref={headerRef}>
      <Template {...props} {...props.settings} />
      <Settings
        {...props}
        className={styles.settings}
        showMulti={false}
        headerRef={headerRef}
      />
    </div>
  )
}
