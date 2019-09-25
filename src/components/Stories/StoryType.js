import React from 'react'
import Label from '@santiment-network/ui/Label'
import Icon from '@santiment-network/ui/Icon'
import { TYPES } from './utils'
import styles from './StoryType.module.scss'

const StoryType = ({ type, className, slides, minutes }) => {
  return (
    <div className={className}>
      <Label variant='round' accent={TYPES[type].color} className={styles.icon}>
        <Icon type={TYPES[type].icon} />
      </Label>
      <Label accent={TYPES[type].color} className={styles.info}>
        {TYPES[type].previewInfo({ slides, minutes })}
      </Label>
    </div>
  )
}

export default StoryType
