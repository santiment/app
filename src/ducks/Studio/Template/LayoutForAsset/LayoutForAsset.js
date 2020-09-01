import React, { Fragment } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import LoadTemplate from '../Dialog/LoadTemplate'
import { useUserTemplates } from '../gql/hooks'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import layoutsTooltipImg from './../../../../assets/tooltips/screener-layouts-tooltip.svg'
import DarkTooltip from '../../../../components/Tooltip/DarkTooltip'
import styles from './LayoutForAsset.module.scss'
import TooltipWithImg from '../../../../components/TooltipWithImg/TooltipWithImg'

export const EXPLANATION_TOOLTIP_MARK = '_ASSET_CHART_LAYOUTS_ROW'

const RowTooltipWrapper = ({ onHide }) => ({ children }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <TooltipWithImg
        mark={EXPLANATION_TOOLTIP_MARK}
        onHide={onHide}
        img={layoutsTooltipImg}
        className={styles.explanation}
        description='Choose from a list of existing chart layouts that you can apply for the selected asset. Use one of our community-made templates or create your own!'
      >
        <div />
      </TooltipWithImg>
      {children}
    </div>
  )
}

const IconTooltipWrapper = ({ children }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <DarkTooltip
        closeTimeout={0}
        align='start'
        localStorageSuffix='_ASSET_CHART_LAYOUTS_ICON'
        position='top'
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

const Trigger = ({ markedAsNew, hideMarkedAsNew, counter, ...rest }) => {
  let Wrapper = markedAsNew
    ? RowTooltipWrapper({ onHide: () => hideMarkedAsNew(false) })
    : Fragment

  const El = !markedAsNew ? IconTooltipWrapper : Fragment

  return (
    <Wrapper>
      <El>
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
      </El>
    </Wrapper>
  )
}

const LayoutForAsset = ({
  currentUser,
  item: { id },
  hide,
  markedAsNew,
  index
}) => {
  const user = currentUser.data
  const [templates] = useUserTemplates(user.id)

  return (
    <LoadTemplate
      trigger={
        <Trigger
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

const mapStateToProps = state => ({
  currentUser: state.user,
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(LayoutForAsset)
