import React from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import GetProjects from '../../../ducks/Signals/common/projects/getProjects'
import FeedFiltersDdWrapper from './FeedFiltersDdWrapper'
import styles from './FeedFiltersDdWrapper.module.scss'

const FeedAssetsFilter = ({ ids, onUpdate }) => {
  return (
    <FeedFiltersDdWrapper
      title='Asset(s)'
      ids={ids}
      onUpdate={onUpdate}
      className={styles.assets}
      render={({ onChange, selectedValues, data, setData }) => {
        return (
          <GetProjects
            skipLoggedInState={true}
            render={({ isLoading, allProjects: items = [] }) => {
              if (isLoading) {
                return <Loader className={styles.loader} />
              }

              if (!data.length && items.length) {
                setData(items)
              }

              return (
                <Select
                  maxHeight={330}
                  classNamePrefix='react-select'
                  minimumInput={1}
                  onChange={onChange}
                  multi={true}
                  value={selectedValues}
                  placeholder='Choose assets'
                  required
                  valueKey='id'
                  isClearable={false}
                  labelKey='name'
                  options={items}
                />
              )
            }}
          />
        )
      }}
    />
  )
}

export default FeedAssetsFilter
