import React, { Fragment } from 'react'
import Timer from '../../Timer'
import TagSelector from '../../TagSelector'
import InsightEditorBottomHelp from './InsightEditorBottomHelp'
import InsightEditorBottomPublishHelp from './InsightEditorBottomPublishHelp'
import InsightEditorBottomPublishBtn from './InsightEditorBottomPublishBtn'
import { dateDifferenceInWords } from '../../../utils/dates'
import styles from './InsightEditor.module.scss'

const InsightEditorBottom = ({
  defaultTags,
  updatedAt,
  onTagsChange,
  onPublishClick,
  isLoading,
  hasMetTextRequirements
}) => {
  const options = { from: new Date(updatedAt) }
  return (
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
              {hasMetTextRequirements && isLoading ? (
                'Saving...'
              ) : (
                <Fragment>
                  Draft saved{' '}
                  <Timer interval={1000 * 60}>
                    {() => dateDifferenceInWords(options)}
                  </Timer>
                </Fragment>
              )}
            </span>
          )}
          {!hasMetTextRequirements && <InsightEditorBottomPublishHelp />}
          <InsightEditorBottomPublishBtn
            isPublishDisabled={isLoading || !hasMetTextRequirements}
            onPublishClick={onPublishClick}
          />
        </div>
      </div>
    </div>
  )
}

export default InsightEditorBottom
