import React from 'react'
import UserAvatar from './UserAvatar'
import AvatarEditor from './AvatarEditor'
import styles from './AvatarSettings.module.scss'

const AvatarSettings = ({ avatarUrl }) => {
  return (
    <div className={styles.container}>
      <UserAvatar as='div' avatarUrl={avatarUrl} />
      <AvatarEditor avatarUrl={avatarUrl} />
    </div>
  )
}

export default AvatarSettings
