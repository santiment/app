import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import UIButton from '@santiment-network/ui/Button'
import UIIcon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import { ProLabel } from '../../components/ProLabel'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import ChartDownloadBtn from './ChartDownloadBtn'
import DownloadCSVBtn from './DownloadCSVBtn'
import styles from './ChartPage.module.scss'

const ShareChart = ({ trigger, shareLink }) => (
  <ShareModalTrigger trigger={trigger} classes={styles} shareLink={shareLink} />
)

export const Icon = ({ className, ...props }) => (
  <UIIcon {...props} className={cx(styles.icon, className)} />
)

export const Button = ({ className, ...props }) => (
  <UIButton
    {...props}
    fluid
    variant='ghost'
    className={cx(styles.context__btn, className)}
  />
)

const ChartSettingsContextMenu = ({
  chartRef,
  showNightModeToggle = true,
  isNightModeActive,
  onNightModeSelect,
  shareLink,
  title,
  showDownload = true,
  showDownloadPNG,
  showMulti = true,
  classes = {},
  isLogScale,
  onScaleChange,
  isMultiChartsActive,
  children,
  data,
  events,
  activeMetrics,
  activeEvents,
  isCartesianGridActive,
  onCartesianGridChange,
  isClosestDataActive,
  onClosestDataChange,
  showWatermarkSettings = true,
  onWatermarkLighterChange,
  isWatermarkLighter
}) => {
  const { isPro } = useUserSubscriptionStatus()
  const isFree = !isPro

  return (
    <ContextMenu
      trigger={
        <UIButton
          variant='flat'
          className={cx(classes.settingsBtn, styles.settingsBtn)}
        >
          <UIIcon type='settings' />
        </UIButton>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.context}>
        {onScaleChange && (
          <Button onClick={onScaleChange}>
            Log scale
            <Toggle isActive={isLogScale} className={styles.context__toggle} />
          </Button>
        )}
        {onCartesianGridChange && (
          <Button onClick={onCartesianGridChange}>
            Cartesian grid
            <Toggle
              isActive={isCartesianGridActive}
              className={styles.context__toggle}
            />
          </Button>
        )}
        {onClosestDataChange && (
          <Button
            onClick={onClosestDataChange}
            className={cx(styles.context__btn, styles.context__btn_big)}
          >
            Show closest data on hover
            <Toggle
              isActive={isClosestDataActive}
              className={styles.context__toggle}
            />
          </Button>
        )}
        {showNightModeToggle && (
          <Button onClick={onNightModeSelect}>
            Night Mode
            <Toggle
              isActive={isNightModeActive}
              className={styles.context__toggle}
            />
          </Button>
        )}
        {showMulti && (
          <Button className={styles.context__btn}>
            Multi charts
            <Toggle
              isActive={isMultiChartsActive}
              className={styles.context__toggle}
            />
          </Button>
        )}
        {showWatermarkSettings && (
          <Button
            onClick={onWatermarkLighterChange}
            disabled={isFree}
            className={styles.context__btn}
          >
            Make watermark less visible
            {isPro ? (
              <Toggle
                isActive={isWatermarkLighter}
                className={styles.context__toggle}
              />
            ) : (
              <ProLabel />
            )}
          </Button>
        )}
        {shareLink && (
          <ShareChart
            shareLink={shareLink}
            trigger={props => (
              <UIButton fluid variant='ghost' {...props}>
                <Icon type='share' />
                Share chart
              </UIButton>
            )}
          />
        )}

        {showDownload && (
          <DownloadCSVBtn
            fluid
            variant='ghost'
            title={title}
            data={data}
            disabled={isFree}
            events={events}
            activeEvents={activeEvents}
            activeMetrics={activeMetrics}
            className={styles.context__btn}
          >
            <span className={styles.context__btn_icon_and_name}>
              <Icon type='save' />
              Download as CSV
            </span>
            {isFree && <ProLabel />}
          </DownloadCSVBtn>
        )}
        {showDownloadPNG && (
          <ChartDownloadBtn
            fluid
            variant='ghost'
            metrics={activeMetrics}
            data={data}
            title={title}
            chartRef={chartRef}
          >
            <Icon type='save' />
            Download as PNG
          </ChartDownloadBtn>
        )}
        {children}
      </Panel>
    </ContextMenu>
  )
}

export default ChartSettingsContextMenu
