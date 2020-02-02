import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import { SIGNAL_ANCHORS } from '../../../ducks/Signals/common/constants'
import CopySignal from '../../../components/SignalCard/controls/CopySignal'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import { DesktopOnly } from '../../../components/Responsive'
import FeedCardDate from '../../feed/GeneralFeed/CardDate/FeedCardDate'
import styles from './ActivityRenderer.module.scss'

const SimpleActivity = ({
  date,
  classes,
  user,
  activity: {
    triggeredAt,
    payload,
    trigger,
    trigger: { id: signalId, title, settings: { type } } = {}
  }
}) => {
  return (
    <div className={styles.wrapper}>
      <DesktopOnly>
        <SignalTypeIcon type={type} className={styles.icon} />
      </DesktopOnly>
      <div className={styles.center}>
        <div className={cx(styles.description, styles.activityCustom)}>
          <h4 className={styles.title}>
            <Link
              to={`/sonar/signal/${signalId}${SIGNAL_ANCHORS.ACTIVITIES}`}
              className={styles.link}
            >
              {title}
            </Link>
            <FeedCardDate date={triggeredAt || date} />
          </h4>
        </div>
        <Markdown
          source={Object.values(payload)[0]}
          className={classes.activityMarkdown}
        />
        <SignalCreator user={user} />
        <CopySignal signal={trigger} />
      </div>
    </div>
  )
}

export default SimpleActivity
