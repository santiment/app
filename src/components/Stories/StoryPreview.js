import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Panel from '@santiment-network/ui/Panel/Panel'
import { TYPES } from './utils'
import styles from './StoryPreview.module.scss'

const StoryPreview = ({
  className = '',
  isViewed = true,
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
            <Label
              className={styles.new}
              accent={TYPES[type].color}
              variant='fill'
            >
              NEW
            </Label>
          )}
          <span className={styles.title}>{previewTitle}</span>
        </h4>
      </div>
      <div className={styles.image}>
        <img
          src={
            info.slides[0].videoId
              ? `https://i.ytimg.com/vi/${
                info.slides[0].videoId
              }/maxresdefault.jpg`
              : info.slides[0].image
          }
          alt=''
        />
      </div>
    </Panel>
  )
}

export default StoryPreview
