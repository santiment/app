import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Panel from '@santiment-network/ui/Panel/Panel'
import StoryType from './StoryType'
import { COLORS } from './content/content'
import styles from './StoryPreview.module.scss'

const StoryPreview = ({
  className = '',
  isViewed,
  previewTitle,
  onClick,
  previewImage,
  type,
  ...info
}) => {
  return (
    <Panel className={cx(styles.wrapper, className)} onClick={onClick}>
      <div className={styles.info}>
        <h4 className={styles.heading}>
          {!isViewed && (
            <Label className={styles.new} accent={COLORS[type]} variant='fill'>
              NEW
            </Label>
          )}
          <span className={styles.title}>{previewTitle}</span>
        </h4>
        <StoryType {...info} type={type} className={styles.type} />
      </div>
      <div className={styles.image}>
        <img src={previewImage} alt='story preview' />
      </div>
    </Panel>
  )
}

export default StoryPreview
