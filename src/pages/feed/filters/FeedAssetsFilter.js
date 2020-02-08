import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Select from '@santiment-network/ui/Search/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import GetProjects from '../../../ducks/Signals/common/projects/getProjects'
import styles from './FeedWatchlistsFilter.module.scss'

const FeedAssetsFilter = ({ ids, onUpdateAssets }) => {
  const [values, setValues] = useState([])
  useEffect(
    () => {
      if (ids.length === 0) {
        onChangeAssets([])
      }
    },
    [ids.length]
  )

  const onChangeAssets = value => {
    setValues(value)
    onUpdateAssets && onUpdateAssets(value.map(({ id }) => +id))
  }

  return (
    <div className={cx(styles.container, styles.assets)}>
      <div className={styles.title}>Asset(s)</div>
      <GetProjects
        render={({ isLoading, allProjects = [] }) => {
          if (isLoading) {
            return <Loader className={styles.loader} />
          }

          return (
            <Select
              maxHeight={330}
              classNamePrefix='react-select'
              minimumInput={1}
              onChange={onChangeAssets}
              multi={true}
              value={values}
              placeholder='Choose assets'
              required
              valueKey='id'
              isClearable={false}
              labelKey='name'
              options={allProjects}
            />
          )
        }}
      />
    </div>
  )
}

export default FeedAssetsFilter
