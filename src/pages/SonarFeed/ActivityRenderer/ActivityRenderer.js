import React, { Fragment } from 'react'
import { POSSIBLE_METRICS_ACTIVITIES } from '../../../ducks/Signals/utils/constants'
import { couldShowChart } from '../../../ducks/Signals/utils/utils'
import SimpleActivity from './SimpleActivity'
import ActivityWithBacktesting from './ActivityWithBacktesting'

const ActivityRenderer = ({
  activity,
  activity: { triggeredAt, trigger: { id: signalId, settings } = {} },
  index,
  classes = {}
}) => {
  const { target } = settings
  const showChart =
    target && couldShowChart(settings, POSSIBLE_METRICS_ACTIVITIES)

  return (
    <Fragment key={triggeredAt + '_' + signalId}>
      {showChart ? (
        <ActivityWithBacktesting
          classes={classes}
          index={index}
          activity={activity}
        />
      ) : (
        <SimpleActivity index={index} classes={classes} activity={activity} />
      )}
    </Fragment>
  )
}

export default ActivityRenderer
