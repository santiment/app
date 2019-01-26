import React from 'react'
import { Button } from '@santiment-network/ui'
import IconShare from './IconShare'
import styles from './ShareBtn.module.scss'

const ShareBtn = ({ asIcon, className = '', ...props }) => {
  return (
    <Button
      {...props}
      className={`${className} ${styles.btn} ${!asIcon ? styles.border : ''}`}
      variant={asIcon ? 'ghost' : 'flat'}
    >
      <IconShare className={styles.icon} />
      {asIcon ? '' : <span className={styles.text}>Share</span>}
    </Button>
  )
}

export default ShareBtn
