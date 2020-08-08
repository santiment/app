import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Edit from './EditAssets'
import styles from './Trigger.module.scss'

const Trigger = ({ name, ...props }) => {
  return (
    <Edit
      {...props}
      name={name}
      trigger={
        <Button border variant='flat'>
          <Icon type='edit' className={styles.icon} />
          <span className={styles.text}>Edit</span>
        </Button>
      }
    />
  )
}

export default Trigger
