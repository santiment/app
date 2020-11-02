import React, { useEffect, useRef } from 'react'
import Alerts from '../../Studio/Alerts'
import styles from './index.module.scss'

export default ({ hoverPoint, ...rest }) => {
  const containerRef = useRef(null)

  useEffect(
    () => {
      const container = containerRef.current

      if (container && container.getBoundingClientRect().x < -15) {
        container.classList.add(styles.alerts_right)
      }
    },
    [containerRef]
  )

  return (
    <div className={styles.add} style={{ '--top': hoverPoint.y + 'px' }}>
      <Alerts
        {...rest}
        {...hoverPoint}
        className={styles.alerts}
        containerRef={containerRef}
      />
    </div>
  )
}
