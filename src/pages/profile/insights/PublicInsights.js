import React from 'react'
import UserInsights from '../../../ducks/Insights/UserInsights'
import styles from './../ProfilePage.module.scss'

const PublicInsights = ({ userId }) => {
  return (
    <div className={styles.block}>
      <UserInsights userId={userId} />
    </div>
  )
}

export default PublicInsights
