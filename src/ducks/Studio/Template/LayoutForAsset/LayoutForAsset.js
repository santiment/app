import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import LoadTemplate from '../Dialog/LoadTemplate'
import { useUserTemplates } from '../gql/hooks'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import SidecarExplanationTooltip from '../../../SANCharts/SidecarExplanationTooltip'
import styles from './LayoutForAsset.module.scss'

const RowTooltipWrapper = ({ children }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <SidecarExplanationTooltip
        closeTimeout={500}
        localStorageSuffix='_ASSET_CHART_LAYOUTS_ROW'
        position='top'
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
        delay={1000}
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
      <SidecarExplanationTooltip
        closeTimeout={500}
        localStorageSuffix='_ASSET_CHART_LAYOUTS_ICON'
        position='top'
        title={
          <div className={styles.tooltip}>Click to apply chart layout</div>
        }
        description=''
        closable={false}
        delay={0}
        className={styles.tooltipContainer}
      >
        <div />
      </SidecarExplanationTooltip>
      {children}
    </div>
  )
}

const Trigger = ({
  showTooltip,
  isHoveredRow,
  isIconHovered,
  counter,
  ...rest
}) => {
  let El = Fragment

  if (isHoveredRow) {
    El = RowTooltipWrapper
  }

  if (isIconHovered) {
    El = IconTooltipWrapper
  }

  return (
    <El>
      <div {...rest} className={styles.counter}>
        {isHoveredRow || isIconHovered ? (
          <Icon type='chart-layout' className={styles.icon} />
        ) : (
          counter
        )}
      </div>
    </El>
  )
}

const LayoutForAsset = ({
  currentUser,
  item: { id },
  showTooltip,
  isHoveredRow,
  index
}) => {
  const user = currentUser.data
  const [templates] = useUserTemplates(user.id)

  const [isIconHovered, setIsIconHovered] = useState(false)

  return (
    <LoadTemplate
      trigger={
        <Trigger
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
          showTooltip={showTooltip}
          isHoveredRow={isHoveredRow}
          isIconHovered={isIconHovered}
          counter={index}
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
