import React from 'react'
import { Redirect } from 'react-router-dom'
import ProfileInfo from './info/ProfileInfo'
import PublicWatchlists from './watchlists/PublicWatchlists'
import PublicSignals from './signals/PublicSignals'
import PublicInsights from './insights/PublicInsights'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'

const ProfilePage = ({ profile = {}, match: { params: { id } = {} } = {} }) => {
  if (!id) {
    return <Redirect to='/' />
  }

  const { username } = profile

  return (
    <div className='page'>
      <Breadcrumbs
        crumbs={[
          {
            label: 'User'
          },
          {
            label: username
          }
        ]}
      />

      <ProfileInfo userId={id} />

      <PublicWatchlists />

      <PublicSignals userId={id} />

      <PublicInsights />
    </div>
  )
}

export default ProfilePage
