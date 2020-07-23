import React, { Fragment, useState, useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import LoadTemplate from '../Dialog/LoadTemplate'
import { useUserTemplates } from '../gql/hooks'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import SidecarExplanationTooltip, {
  markedAsShowed
} from '../../../SANCharts/SidecarExplanationTooltip'
import DarkTooltip from '../../../../components/Tooltip/DarkTooltip'
import styles from './LayoutForAsset.module.scss'

const EXPLANATION_TOOLTIP_MARK = '_ASSET_CHART_LAYOUTS_ROW'

const RowTooltipWrapper = ({ onClose }) => ({ children }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <SidecarExplanationTooltip
        closeTimeout={500}
        localStorageSuffix={EXPLANATION_TOOLTIP_MARK}
        position='top'
        onClose={onClose}
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

const Trigger = ({ showTooltip, isIconHovered, counter, ...rest }) => {
  const [showExplanation, setShow] = useState(false)

  useEffect(() => {
    if (counter === 1 && !markedAsShowed(EXPLANATION_TOOLTIP_MARK)) {
      setTimeout(() => setShow(true), 5000)
    }
  }, [])

  let El = Fragment
  let Wrapper = showExplanation
    ? RowTooltipWrapper({ onClose: () => setShow(false) })
    : Fragment

  if (!showExplanation) {
    El = IconTooltipWrapper
  }

  return (
    <Wrapper>
      <El>
        <div
          {...rest}
          className={cx(
            styles.counterContainer,
            isIconHovered && styles.hovered
          )}
        >
          <Icon type='chart-layout' className={styles.icon} />
          <div className={styles.counter}>{counter}</div>
        </div>
      </El>
    </Wrapper>
  )
}

const LayoutForAsset = ({ currentUser, item: { id }, showTooltip, index }) => {
  const user = currentUser.data
  const [templates] = useUserTemplates(user.id)

  return (
    <LoadTemplate
      trigger={<Trigger showTooltip={showTooltip} counter={index} />}
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
