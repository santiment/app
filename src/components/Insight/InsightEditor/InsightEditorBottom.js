import React, { Fragment } from 'react'
import moment from 'moment'
import Timer from '../../Timer'
import TagSelector from '../../TagSelector'
import InsightEditorBottomHelp from './InsightEditorBottomHelp'
import InsightEditorBottomPublishBtn from './InsightEditorBottomPublishBtn'
import styles from './InsightEditor.module.scss'

const InsightEditorBottom = ({
  defaultTags,
  updatedAt,
  onTagsChange,
  onPublishClick,
  isLoading,
  isPublishDisabled = false
}) => (
  <div className={styles.bottom}>
    <div className={styles.container}>
      <div className={styles.bottom__left}>
        <span className={styles.tagsLabel}>Add Tags</span>
        <TagSelector
          onChange={onTagsChange}
          defaultTags={defaultTags}
          className={styles.tags}
        />
        <InsightEditorBottomHelp />
      </div>
      <div className={styles.bottom__right}>
        {updatedAt && (
          <span className={styles.save}>
            {isLoading ? (
              'Saving...'
            ) : (
              <Fragment>
                Draft saved{' '}
                <Timer interval={1000 * 60}>
                  {() => moment(updatedAt).fromNow()}
                </Timer>
              </Fragment>
            )}
          </span>
        )}
        <InsightEditorBottomPublishBtn
          isPublishDisabled={isPublishDisabled}
          onPublishClick={onPublishClick}
        />
      </div>
    </div>
  </div>
)

export default InsightEditorBottom
