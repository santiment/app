import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import styles from './ChartPage.module.scss'

const ChartSettingsContextMenu = ({
  showNightModeToggle = true,
  isNightModeActive,
  onNightModeSelect,
  shareLink
}) => {
  return (
    <ContextMenu
      trigger={
        <Button variant='flat'>
          <Icon type='settings' />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.context}>
        {showNightModeToggle && (
          <Button
            fluid
            variant='ghost'
            onClick={onNightModeSelect}
            className={styles.context__btn}
          >
            Night Mode
            <Toggle
              isActive={isNightModeActive}
              className={styles.context__toggle}
            />
          </Button>
        )}
        <ShareChart
          shareLink={shareLink}
          trigger={props => (
            <Button fluid variant='ghost' {...props}>
              Share
            </Button>
          )}
        />
      </Panel>
    </ContextMenu>
  )
}

export const ShareChart = ({ trigger, shareLink, asIcon }) => (
  <ShareModalTrigger
    trigger={trigger}
    classes={styles}
    shareLink={shareLink}
    asIcon={asIcon}
    extraShare={[
      {
        value: `<iframe frameborder="0" height="340" src="${shareLink}"></iframe>`,
        label: 'Copy iframe'
      }
    ]}
  />
)

export default ChartSettingsContextMenu
