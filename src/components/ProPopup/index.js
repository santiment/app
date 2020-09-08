import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import styles from './index.module.scss'

const ProPopup = ({
  title = '',
  description = '',
  features = [],
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog
      title={title}
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      classes={styles}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.description}>{description}</div>
        <div className={styles.features}>
          {features.map((item, idx) => (
            <div className={styles.feature} key={idx}>
              {item}
            </div>
          ))}
        </div>
        <Button
          as={Link}
          to='/pricing'
          variant='fill'
          accent='orange'
          className={styles.btn}
          onClick={() => setOpen(false)}
        >
          Go Pro
        </Button>
        <Button onClick={() => setOpen(false)} className={styles.btn} border>
          No thanks
        </Button>
      </div>
    </Dialog>
  )
}

export default ProPopup
