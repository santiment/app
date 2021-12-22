import React, { useMemo, useState } from 'react'
import { useField } from 'formik'
import { InputWithIcon } from '@santiment-network/ui/Input'
import PageLoader from '../../../../../../../components/Loader/PageLoader'
import StepTitle from '../../StepTitle/StepTitle'
import NextStep from '../../NextStep/NextStep'
import WatchlistsAndScreenersList from './WatchlistsList/WatchlistsAndScreenersList'
import {
  useProjectScreeners,
  useProjectWatchlists
} from '../../../../../../Watchlists/gql/lists/hooks'
import styles from './WatchlistAndScreenerSelector.module.scss'

const WatchlistAndScreenerSelector = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  },
  type
}) => {
  const [, { value }, { setValue }] = useField(
    type === 'watchlist'
      ? 'settings.target.watchlist_id'
      : 'settings.operation.selector.watchlist_id'
  )
  const [, , { setValue: setMetric }] = useField('settings.metric')
  const [, , { setValue: setTimeWindow }] = useField('settings.time_window')
  const [, , { setValue: setOperation }] = useField('settings.operation')
  const [watchlists, watchlistsLoading] = useProjectWatchlists()
  const [screeners, screenersLoading] = useProjectScreeners()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = useMemo(() => {
    if (type === 'watchlist') {
      return watchlists.filter(
        watchlist => watchlist.name.toLowerCase().indexOf(searchTerm) !== -1
      )
    }

    return screeners.filter(
      screener => screener.name.toLowerCase().indexOf(searchTerm) !== -1
    )
  }, [screeners, watchlists, searchTerm])

  function handleNextClick () {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1])
    }
  }

  function handleSelectWatchlist (id) {
    if (value === id) {
      setValue('')
    } else {
      setValue(+id)
    }
    if (type === 'watchlist') {
      setMetric("")
      setTimeWindow("");
      setOperation({});
    }
  }

  let children = (
    <>
      <div className={styles.titleWrapper}>
        <StepTitle
          iconType='view-option'
          title={type === 'watchlist' ? 'Select Watchlist' : 'Select Screener'}
          className={styles.title}
        />
        {value && (
          <NextStep
            label={
              type === 'watchlist' ? 'Choose Metric' : 'Notification settings'
            }
            onClick={handleNextClick}
          />
        )}
      </div>
      <InputWithIcon
        type='text'
        icon='search-small'
        iconPosition='left'
        className={styles.search}
        placeholder={
          type === 'watchlist' ? 'Search for watchlist' : 'Search for screener'
        }
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <WatchlistsAndScreenersList
        items={filteredItems}
        selectedWatchlist={value}
        onSelect={handleSelectWatchlist}
      />
    </>
  )

  if (watchlistsLoading || screenersLoading) {
    children = (
      <PageLoader
        containerClass={styles.loaderWrapper}
        className={styles.loader}
      />
    )
  }

  return <div className={styles.wrapper}>{children}</div>
}

export default WatchlistAndScreenerSelector
