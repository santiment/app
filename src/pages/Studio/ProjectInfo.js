import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AddToWatchlist from '../../ducks/Watchlists/Actions/Add'
import ChartSignalCreationDialog from '../../ducks/SANCharts/ChartSignalCreationDialog'
import Grave from '../../components/Halloween/Grave'
import { useUser } from '../../stores/user'
import styles from './index.module.scss'

const ProjectInfo = ({ studio, settings }) => {
  const [actionsNode, setActionsNode] = useState()
  const { slug } = settings
  const { isLoggedIn } = useUser()
  const [knockNumber, setKnockNumber] = useState(0)

  useEffect(() => {
    if (!studio) return

    if (knockNumber > 0) {
      setKnockNumber(0)
    }

    setActionsNode(document.querySelector('.project-actions'))
  }, [studio])

  return actionsNode ? (
    <>
      {ReactDOM.createPortal(
        <>
          <Grave
            slug='charts'
            setKnockNumber={setKnockNumber}
            knockNumber={knockNumber}
            name={slug}
          />
          <AddToWatchlist
            trigger={
              <Button border className={cx('btn btn--green', styles.watchlist)}>
                <Icon type='add-watchlist' className={styles.btn__icon} />
                Watch
              </Button>
            }
            projectId={settings.projectId}
            slug={slug}
            isLoggedIn={isLoggedIn}
          />
          <ChartSignalCreationDialog
            slug={slug}
            trigger={
              <Button
                border
                className={cx(styles.btn, styles.signal, 'mrg-s mrg--l')}
              >
                <Icon type='signal' className={styles.btn__icon} />
                Add alert
              </Button>
            }
          />
        </>,
        actionsNode
      )}
    </>
  ) : null
}

export default ProjectInfo
