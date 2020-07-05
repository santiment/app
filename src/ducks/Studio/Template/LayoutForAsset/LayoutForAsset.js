import React, { useState, useCallback, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadTemplate from '../Dialog/LoadTemplate'
import { useUserTemplates } from '../gql/hooks'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import SidecarExplanationTooltip from '../../../SANCharts/SidecarExplanationTooltip'
import styles from './LayoutForAsset.module.scss'

const Icon = (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0.171828 5.10338C-0.0572759 5.25754 -0.0572759 5.50749 0.171828 5.66165L7.5841 10.6493C7.81321 10.8035 8.18466 10.8035 8.41376 10.6493L15.8262 5.66157C16.0553 5.50741 16.0553 5.25746 15.8262 5.1033L8.41388 0.115622C8.18478 -0.0385407 7.81333 -0.0385405 7.58422 0.115622L0.171828 5.10338ZM7.99893 9.81192L1.41631 5.38252L7.99905 0.95303L14.5817 5.38243L7.99893 9.81192ZM1.00149 10.3367C0.772382 10.1826 0.400932 10.1826 0.171828 10.3367C-0.0572759 10.4909 -0.0572759 10.7408 0.171828 10.895L7.5841 15.8827C7.81321 16.0368 8.18466 16.0368 8.41376 15.8827L15.8262 10.8949C16.0553 10.7407 16.0553 10.4908 15.8262 10.3366C15.5971 10.1825 15.2256 10.1825 14.9965 10.3366L7.99893 15.0453L1.00149 10.3367Z'
      fill='var(--rhino)'
    />
  </svg>
)

const TooltipWrapper = ({ children }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <SidecarExplanationTooltip
        closeTimeout={500}
        localStorageSuffix='_ASSET_CL'
        position='top'
        title={
          <div className={styles.tooltip}>
            {[
              <div key='new' className={styles.new}>
                New!
              </div>,
              'Click to use chart layout'
            ]}
          </div>
        }
        description=''
        withArrow
        dismissOnTouch
      >
        {children}
      </SidecarExplanationTooltip>
    </div>
  )
}

const Trigger = ({ showTooltip, hovered, counter, ...rest }) => {
  const El = showTooltip ? TooltipWrapper : Fragment

  return (
    <El>
      <div {...rest} className={styles.counter}>
        {hovered ? <div>{Icon}</div> : counter}
      </div>
    </El>
  )
}

const LayoutForAsset = ({
  currentUser,
  item: { id },
  index,
  showTooltip = false
}) => {
  const user = currentUser.data
  const [templates] = useUserTemplates(user.id)

  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
  })

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  })

  return (
    <LoadTemplate
      trigger={
        <Trigger
          showTooltip={showTooltip}
          hovered={hovered}
          counter={index}
          onTouchStart={handleMouseEnter}
          onMouseEnter={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
          onTouchCancel={handleMouseLeave}
          onMouseLeave={handleMouseLeave}
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
