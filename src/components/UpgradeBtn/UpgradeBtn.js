import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Plans from '../Plans/Plans'
import styles from './UpgradeBtn.module.scss'

const UpgradeBtn = ({ className, children = 'Upgrade' }) => {
  return (
    <Dialog
      classes={styles}
      title='Plan upgrade'
      trigger={
        <Button className={cx(styles.btn, className)} accent='orange'>
          <Icon type='crown' className={styles.icon} />
          {children}
        </Button>
      }
    >
      <Dialog.ScrollContent>
        <Plans />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default UpgradeBtn
