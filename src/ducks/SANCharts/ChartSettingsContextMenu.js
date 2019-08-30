import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import ChartDownloadBtn from './ChartDownloadBtn'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import styles from './ChartPage.module.scss'

const ShareChart = ({ trigger, shareLink }) => (
  <ShareModalTrigger
    trigger={trigger}
    classes={styles}
    shareLink={shareLink}
    extraShare={[
      {
        value: `<iframe frameborder="0" height="340" src="${shareLink}"></iframe>`,
        label: 'Copy iframe'
      }
    ]}
  />
)

const ChartSettingsContextMenu = ({
  chartRef,
  showNightModeToggle = true,
  isNightModeActive,
  onNightModeSelect,
  shareLink,
  activeMetrics,
  title,
  showDownload = true,
  children
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
        {showDownload && (
          <ChartDownloadBtn
            fluid
            variant='ghost'
            metrics={activeMetrics}
            title={title}
            chartRef={chartRef}
          >
            Download as PNG
          </ChartDownloadBtn>
        )}
        {children}
      </Panel>
    </ContextMenu>
  )
}

export default ChartSettingsContextMenu
