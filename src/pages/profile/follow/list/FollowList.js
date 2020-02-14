import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import { checkIsLoggedIn } from '../../../UserSelectors'
import { connect } from 'react-redux'
import FollowBtn from '../FollowBtn'
import UserAvatar from '../../../Account/avatar/UserAvatar'
import styles from './FollowList.module.scss'

const FollowList = ({ title, list: { users = [] }, trigger, isLoggedIn }) => {
  const updateCache = () => {}

  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={title}
      classes={styles}
      trigger={trigger}
    >
      <Dialog.ScrollContent>
        <div className={styles.list}>
          {users &&
            users.map(({ id, username, avatarUrl }) => {
              return (
                <div className={styles.row}>
                  <Link to={'/profile/' + id} className={styles.user}>
                    <UserAvatar
                      isExternal
                      externalAvatarUrl={avatarUrl}
                      classes={styles}
                    />

                    <div
                      className={cx(styles.name, !username && styles.noName)}
                    >
                      {username || 'No name'}
                    </div>
                  </Link>
                  <FollowBtn
                    className={styles.followBtn}
                    userId={id}
                    updateCache={updateCache}
                  />
                </div>
              )
            })}
        </div>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default connect(mapStateToProps)(FollowList)
