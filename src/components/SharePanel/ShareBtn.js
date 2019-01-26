import React from 'react'
import { Button, Icon } from '@santiment-network/ui'
import styles from './ShareBtn.module.scss'

const ShareBtn = ({ asIcon, className = '', ...props }) => {
  return (
    <Button
      {...props}
      className={`${className} ${styles.btn}`}
      border={!asIcon}
      variant={asIcon ? 'ghost' : 'flat'}
    >
      <Icon type='share' className={styles.icon} />
      {asIcon ? '' : <span className={styles.text}>Share</span>}
    </Button>
  )
}

export default ShareBtn
