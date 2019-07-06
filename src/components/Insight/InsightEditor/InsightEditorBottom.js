import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import Timer from '../../Timer'
import InsightEditorPublishHelp from './PrePublishHelp'
import PrePublishButton from './PrePublishPopup'
import { dateDifferenceInWords } from '../../../utils/dates'
import { noTrendTagsFilter } from '../utils'
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
  const hasMetRequirements =
    hasMetTextRequirements.title && hasMetTextRequirements.text
  const tags = defaultTags.filter(noTrendTagsFilter)
  return (
    <div className={styles.bottom}>
      <div className={styles.container}>
        {updatedAt && (
          <span className={styles.save}>
            {hasMetRequirements && isLoading ? (
              'Saving...'
            ) : (
              <>
                Draft saved{' '}
                <Timer interval={1000 * 60}>
                  {() => dateDifferenceInWords(options)}
                </Timer>
              </>
            )}
          </span>
        )}
        {!hasMetRequirements && (
          <Tooltip
            on='hover'
            align='end'
            trigger={
              <div>
                <Button border disabled>
                  Publish insight
                  <Icon type='arrow-up' className={styles.icon} />
                </Button>
              </div>
            }
          >
            <Panel padding>
              <InsightEditorPublishHelp
                requiredOptions={hasMetTextRequirements}
              />
            </Panel>
          </Tooltip>
        )}
        {hasMetRequirements && (
          <PrePublishButton
            isLoading={isLoading}
            onTagsChange={onTagsChange}
            defaultTags={tags}
            onPublishClick={onPublishClick}
          />
        )}
      </div>
    </div>
  )
}

export default InsightEditorBottom
