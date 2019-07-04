import React, { Fragment } from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import Timer from '../../Timer'
import TagSelector from '../../TagSelector'
import InsightEditorPublishHelp from './InsightEditorBottomPublishHelp'
import InsightEditorBottomHelp from './InsightEditorBottomHelp'
import PrePublishButton from './PrePublishPopup'
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
          {!hasMetTextRequirements && (
            <Tooltip
              on='hover'
              trigger={
                <Button border accent='grey'>
                  Publish insight
                  <Icon type='arrow-down' className={styles.icon} />
                </Button>
              }
            >
              <Panel padding>
                <InsightEditorPublishHelp />
              </Panel>
            </Tooltip>
          )}
          {hasMetTextRequirements && <PrePublishButton />}
        </div>
      </div>
    </div>
  )
}

export default InsightEditorBottom
