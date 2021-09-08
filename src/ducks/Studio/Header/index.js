import React, { useRef } from 'react'
import Settings from './Settings'
import styles from './index.module.scss'

export const Header = props => (
  <Settings {...props} className={styles.settings} />
)

export default props => {
  const headerRef = useRef(null)
  return (
    <div className={styles.wrapper} ref={headerRef}>
      <Header {...props} headerRef={headerRef} />
    </div>
  )
}
