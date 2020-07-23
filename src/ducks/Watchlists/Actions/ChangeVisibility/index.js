import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import { useUpdateWatchlist } from '../../gql/hooks'
import styles from './index.module.scss'

const PublicityToggle = ({ watchlist }) => {
  const [isActive, setActive] = useState(watchlist.isPublic)
  const [updateWatchlist] = useUpdateWatchlist()

  return (
    <Button
      fluid
      variant='ghost'
      className={styles.wrapper}
      onClick={() => {
        setActive(!isActive)
        updateWatchlist(watchlist, { isPublic: !isActive })
      }}
    >
      Public <Toggle isActive={isActive} className={styles.toggle} />
    </Button>
  )
}

export default PublicityToggle
