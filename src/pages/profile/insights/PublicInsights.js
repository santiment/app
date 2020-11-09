import React from 'react'
import cx from 'classnames'
import UserInsights from '../../../ducks/Insights/UserInsights'
import externalStyles from './../ProfilePage.module.scss'

const PublicInsights = ({ userId }) => {
  return (
    <div className={cx(externalStyles.block, externalStyles.insights)}>
      <UserInsights userId={userId} />
    </div>
  )
}

export default PublicInsights
