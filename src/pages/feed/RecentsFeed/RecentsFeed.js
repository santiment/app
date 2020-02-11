import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import { ProjectSelector } from '../../../ducks/SANCharts/Header'
import { SidecarItems } from '../../../ducks/SANCharts/ChartSidecar'
import styles from './RecentsFeed.module.scss'

const RecentsFeed = ({ onSlugSelect }) => {
  return (
    <div className={styles.container}>
      <div>
        <ProjectSelector
          trigger={() => (
            <div className={styles.search}>
              Explore assets
              <Icon type='search' className={styles.searchIcon} />
            </div>
          )}
          onChange={([dataProject], closeDialog) => {
            if (dataProject) {
              onSlugSelect(dataProject)
              closeDialog()
            }
          }}
        />
      </div>
      <div className={styles.scrollable}>
        <SidecarItems
          onSlugSelect={onSlugSelect}
          onProjectClick={onSlugSelect}
          classes={styles}
          showFooter={true}
        />
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  onSlugSelect: ({ slug }) => {
    dispatch(push('/projects/' + slug))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(RecentsFeed)
