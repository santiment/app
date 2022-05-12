import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import TrendsSearchForm from '../../../../components/Trends/Search'
import Suggestions from '../../../../components/Trends/Search/Suggestions'
import { DesktopOnly } from '../../../../components/Responsive'
import Trends from '../../../../components/Trends/Trends'
import Header from '../Header/Header'
import { getTimePeriod } from '../../../TrendsExplore/utils'
import { formatDate, getDatetimeFromUrl } from './utils'
import dashboardsStyles from '../dashboards.module.scss'
import styles from './SocialTrends.module.scss'

const SocialTrends = ({ history, shareLinkText, description }) => {
  const datetime = getDatetimeFromUrl()
  const defaultSelectedPeriod = datetime
    ? { ...getTimePeriod(datetime.toString(), '4h'), interval: '1h' }
    : null

  const [selectedPeriod, setSelectedPeriod] = useState(defaultSelectedPeriod)

  useEffect(() => {
    if (selectedPeriod && datetime !== selectedPeriod.to) {
      const pathname = `/dashboards/labs/trends?datetime=${selectedPeriod.to}`

      history.push(pathname)
    }

    if (!selectedPeriod && datetime) {
      const pathname = '/dashboards/labs/trends'

      history.push(pathname)
    }
  }, [selectedPeriod])

  return (
    <div className='column fluid'>
      <Header shareLinkText={shareLinkText} description={description} />
      <div className={cx('column', dashboardsStyles.content)}>
        <div className={cx('column mrg--b mrg-xl', dashboardsStyles.socialTrendsForm)}>
          <TrendsSearchForm withButton classes={{ wrapper: 'mrg--b mrg-s' }} />
          <DesktopOnly>
            <Suggestions className={styles.suggestions} />
          </DesktopOnly>
        </div>
        {selectedPeriod && (
          <div className={cx(styles.daysSelector, dashboardsStyles.socialTrendsPeriod)}>
            <>
              <span>{`You are observing Top 10 word for ${formatDate(selectedPeriod.to)}`}</span>
              <Button border className={styles.switch} onClick={() => setSelectedPeriod(null)}>
                Switch to the latest trends
              </Button>
            </>
          </div>
        )}
        <Trends {...(selectedPeriod || {})} period={selectedPeriod || {}} />
      </div>
    </div>
  )
}

export default SocialTrends
