import React from 'react'
import cx from 'classnames'
import UserInsights from '../../../ducks/Insights/UserInsights'
import externalStyles from './../ProfilePage.module.scss'

const PublicInsights = ({ userId, isOwner }) => {
  return (
    <div className={cx(externalStyles.block, externalStyles.insights)}>
      <UserInsights userId={userId} isOwner={isOwner} />
    </div>
  )
}

export default PublicInsights
