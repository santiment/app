import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import LoadTemplate from '../Dialog/LoadTemplate'
import { useUserTemplates } from '../gql/hooks'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import SidecarExplanationTooltip from '../../../SANCharts/SidecarExplanationTooltip'
import styles from './LayoutForAsset.module.scss'

const TooltipWrapper = ({ children }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <SidecarExplanationTooltip
        closeTimeout={500}
        localStorageSuffix='_ASSET_CHART_LAYOUTS'
        position='top'
        title={
          <div className={styles.tooltip}>Apply chart layout on the asset</div>
        }
        description=''
        closable={false}
        withArrow
        delay={1000}
      >
        <div />
      </SidecarExplanationTooltip>
      {children}
    </div>
  )
}

const Trigger = ({ showTooltip, isHovered, counter, ...rest }) => {
  const El = isHovered ? TooltipWrapper : Fragment
  return (
    <El>
      <div {...rest} className={styles.counter}>
        {isHovered ? (
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
  isHovered,
  index
}) => {
  const user = currentUser.data
  const [templates] = useUserTemplates(user.id)

  return (
    <LoadTemplate
      trigger={
        <Trigger
          showTooltip={showTooltip}
          isHovered={isHovered}
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
