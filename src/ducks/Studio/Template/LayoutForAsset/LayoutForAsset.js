import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import LoadTemplate from '../Dialog/LoadTemplate'
import { useUserTemplates } from '../gql/hooks'
import layoutsTooltipImg from './../../../../assets/tooltips/screener-layouts-bg.jpg'
import DarkTooltip from '../../../../components/Tooltip/DarkTooltip'
import TooltipWithImg from '../../../../components/TooltipWithImg/TooltipWithImg'
import { useUser } from '../../../../stores/user'
import { ForceClosableExplanationTooltip } from '../../../SANCharts/SidecarExplanationTooltip'
import styles from './LayoutForAsset.module.scss'

export const EXPLANATION_TOOLTIP_MARK = '_ASSET_CHART_LAYOUTS_ROW'

const RowTooltipBuilder = ({ onHide }) => ({ children }) => {
  const [shown, setShown] = useState(true)

  return (
    <div className={styles.tooltipWrapper}>
      <TooltipWithImg
        shown={shown}
        mark={EXPLANATION_TOOLTIP_MARK}
        onHide={onHide}
        img={layoutsTooltipImg}
        className={styles.explanation}
        tooltipEl={ForceClosableExplanationTooltip}
        description='Choose from a list of existing chart layouts that you can apply for the selected asset. Use one of our community-made templates or create your own!'
      >
        <div />
      </TooltipWithImg>
      <div onClick={() => setShown(false)}>{children}</div>
    </div>
  )
}

const IconTooltipWrapper = ({ children, className, index }) => {
  return (
    <div className={cx(styles.tooltipWrapper, className)}>
      <DarkTooltip
        closeTimeout={0}
        align='start'
        position={index === 1 ? 'bottom' : 'top'}
        description=''
        closable={false}
        delay={500}
        withArrow={false}
        offsetY={3}
        className={styles.tooltipContainer}
        trigger={children}
      >
        <div className={cx(styles.iconTooltip, styles.tooltip)}>
          Click to apply chart layout
        </div>
      </DarkTooltip>
    </div>
  )
}

const Trigger = ({
  markedAsNew,
  hideMarkedAsNew,
  counter,
  className,
  ...rest
}) => {
  let Wrapper = useMemo(
    () => {
      return markedAsNew
        ? RowTooltipBuilder({
          onHide: () => markedAsNew && hideMarkedAsNew(false)
        })
        : IconTooltipWrapper
    },
    [markedAsNew, hideMarkedAsNew]
  )

  return (
    <Wrapper className={className} index={counter}>
      <div
        {...rest}
        className={cx(
          styles.counterContainer,
          markedAsNew && styles.hovered,
          'assets-table-row-tooltip'
        )}
      >
        <Icon type='chart-layout' className={styles.icon} />
        <div className={styles.counter}>{counter}</div>
      </div>
    </Wrapper>
  )
}

const LayoutForAsset = ({
  item: { id },
  hide,
  markedAsNew,
  index,
  className
}) => {
  const { user } = useUser()
  const [templates] = useUserTemplates(user ? user.id : undefined)

  return (
    <LoadTemplate
      trigger={
        <Trigger
          className={className}
          counter={index}
          markedAsNew={markedAsNew}
          hideMarkedAsNew={hide}
        />
      }
      templates={templates}
      asProject={id}
      isFeatured={true}
      asLink={true}
    />
  )
}

export default LayoutForAsset
