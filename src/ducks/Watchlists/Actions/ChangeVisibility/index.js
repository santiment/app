import React, { useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Toggle from '../../../../components/VisibilityIndicator/Toggle'
import { useUpdateWatchlist } from '../../gql/hooks'
import styles from './index.module.scss'

const PublicityToggle = ({ watchlist, className, ...props }) => {
  const [isActive, setActive] = useState(watchlist.isPublic)
  const [updateWatchlist] = useUpdateWatchlist()

  return (
    <Button
      className={cx(styles.wrapper, className)}
      onClick={() => {
        setActive(!isActive)
        updateWatchlist(watchlist, { isPublic: !isActive })
      }}
      {...props}
    >
      {isActive ? 'Public' : 'Private'}
      <Toggle isActive={isActive} className={styles.toggle} />
    </Button>
  )
}

export default PublicityToggle
