import React from 'react'
import Alerts from '../../Studio/Alerts'
import styles from './index.module.scss'

export default ({ hoverPoint, ...rest }) => {
  return (
    <div className={styles.add} style={{ '--top': hoverPoint.y + 'px' }}>
      <Alerts {...rest} {...hoverPoint} className={styles.alerts} />
    </div>
  )
}
