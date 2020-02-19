import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import styles from './UserAvatar.module.scss'
import SidecarExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip'

const UserAvatar = ({
  classes = {},
  isExternal,
  externalAvatarUrl,
  avatarUrl = '',
  as: El = Link,
  userId,
  to,
  showExplanation
}) => {
  const picUrl = isExternal ? externalAvatarUrl : avatarUrl

  const linkTo = to || '/profile/' + userId

  const enabledExplanation = showExplanation && El !== 'div'

  return (
    <SidecarExplanationTooltip
      closeTimeout={500}
      showEnabled={enabledExplanation}
      localStorageSuffix='_PROFILE_FOLLOW_EXPLANATION'
      position='top'
      title={<div>Click to open profile</div>}
      description=''
    >
      <>
        <El
          to={linkTo}
          className={cx(
            styles.avatar,
            classes.avatar,
            !picUrl && classes.avatarEmpty
          )}
          style={{
            backgroundImage: `url("${picUrl}"`
          }}
        >
          {!picUrl && <Icon type='profile' className={classes.avatarIcon} />}
        </El>
      </>
    </SidecarExplanationTooltip>
  )
}

const mapStateToProps = ({ user: { data } }) => {
  return {
    avatarUrl: data && !!data.id ? data.avatarUrl : ''
  }
}

const enchance = connect(mapStateToProps)

export default enchance(UserAvatar)
