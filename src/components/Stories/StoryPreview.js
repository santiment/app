import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Panel from '@santiment-network/ui/Panel/Panel'
import { addDays } from '../../utils/dates'
import styles from './StoryPreview.module.scss'

const LIMIT_DAYS = 7

const StoryPreview = ({
  className = '',
  previewTitle,
  onClick,
  previewImage,
  createdAt,
  type,
  isTutorial,
  ...info
}) => {
  const isNew = addDays(new Date(), -1 * LIMIT_DAYS) <= new Date(createdAt)

  return (
    <Panel
      className={cx(styles.wrapper, className, isTutorial && styles.tutorial)}
      onClick={onClick}
    >
      <div className={styles.info}>
        <h4 className={styles.heading}>
          {isNew && (
            <Label
              className={styles.newLabel}
              accent={isTutorial ? 'heliotrope' : 'jungle-green'}
              variant='fill'
            >
              NEW
            </Label>
          )}
          <span className={cx(styles.title, isNew && styles.newTitle)}>
            {previewTitle}
          </span>
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
