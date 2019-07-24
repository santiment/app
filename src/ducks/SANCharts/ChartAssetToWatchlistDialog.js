import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WatchlistsPopup from '../../components/WatchlistPopup/WatchlistsPopup'
import styles from './ChartAssetToWatchlistDialog.module.scss'

const ChartAssetToWatchlistDialog = ({ project }) => (
  <WatchlistsPopup
    {...project}
    dialogProps={{
      passOpenStateAs: 'isActive'
    }}
    trigger={
      <Button variant='flat' className={styles.btn}>
        <Icon type='add-watchlist' />
      </Button>
    }
  />
)

export default ChartAssetToWatchlistDialog
