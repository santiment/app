import React, { Fragment } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import LoadTemplate from '../Dialog/LoadTemplate'
import { useUserTemplates } from '../gql/hooks'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import SidecarExplanationTooltip from '../../../SANCharts/SidecarExplanationTooltip'
import DarkTooltip from '../../../../components/Tooltip/DarkTooltip'
import styles from './LayoutForAsset.module.scss'

export const EXPLANATION_TOOLTIP_MARK = '_ASSET_CHART_LAYOUTS_ROW'

const RowTooltipWrapper = ({ onHide }) => ({ children }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <SidecarExplanationTooltip
        closeTimeout={500}
        localStorageSuffix={EXPLANATION_TOOLTIP_MARK}
        position='top'
        onHide={onHide}
        title={
          <div className={styles.tooltip}>
            <div className={styles.titleLine}>
              {[
                <div className={styles.new} key='new'>
                  New!
                </div>,
                'Apply chart layout'
              ]}
            </div>
            <div>on the asset</div>
          </div>
        }
        description=''
        withArrow
        delay={0}
        className={styles.tooltipContainer}
      >
        <div />
      </SidecarExplanationTooltip>
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
  hideMarkedAsNew,
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
          hideMarkedAsNew={hideMarkedAsNew}
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
