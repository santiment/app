import React from 'react'
import { Button } from '@santiment-network/ui'
import moment from 'moment'
import Timer from './Timer'
import TagSelector from './TagSelector'
import styles from './InsightsEditor.module.scss'

const InsightEditorBottom = ({
  defaultTags,
  updatedAt,
  onTagsChange,
  onPublishClick,
  isPublishDisabled = false
}) => (
  <div className={styles.bottom}>
    <div className={styles.container}>
      <div className={styles.bottom__left}>
        Add Tags
        <TagSelector onChange={onTagsChange} defaultTags={defaultTags} />
      </div>
      <div className={styles.bottom__right}>
        {updatedAt && (
          <span className={styles.save}>
            Draft saved{' '}
            <Timer interval={1000 * 60}>
              {() => moment(updatedAt).fromNow()}
            </Timer>
          </span>
        )}
        <Button
          disabled={isPublishDisabled}
          onClick={isPublishDisabled ? undefined : onPublishClick}
          className={styles.publishBtn}
          border
          variant='ghost'
        >
          Publish insight
        </Button>
      </div>
    </div>
  </div>
)

export default InsightEditorBottom
