import React from 'react'
import { Dialog } from '@santiment-network/ui'
import styles from './BannerMobile.module.scss'

const classes = { title: styles.title }

const BannerMobile = ({ children }) => {
  return (
    <Dialog trigger={<></>} position='bottom' defaultOpen classes={classes}>
      <div className={styles.banner}>{children}</div>
    </Dialog>
  )
}

export default BannerMobile
