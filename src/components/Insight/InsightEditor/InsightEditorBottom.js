import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import Timer from '../../Timer'
import InsightEditorPublishHelp from './PrePublishHelp'
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
  const hasRequirements =
    hasMetTextRequirements.title && hasMetTextRequirements.text
  const tags = defaultTags.filter(
    ({ name }) => !name.endsWith('-trending-words')
  )
  return (
    <div className={styles.bottom}>
      <div className={styles.container}>
        {updatedAt && (
          <span className={styles.save}>
            {hasRequirements && isLoading ? (
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
        {!hasRequirements && (
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
        {hasRequirements && (
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
