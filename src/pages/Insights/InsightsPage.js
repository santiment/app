import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Tabs, Button, Icon } from '@santiment-network/ui'
import Loadable from 'react-loadable'
import PageLoader from '../../components/PageLoader'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import Select from '../../components/Select/Select'
import { SortReducer } from './utils'
import styles from './InsightsPage.module.scss'

export const baseLocation = '/insights'

const LoadableInsightsAllFeedPage = Loadable({
  loader: () => import('./InsightsAllFeedPage'),
  loading: () => <PageLoader />
})

const LoadableInsightsFeedPage = Loadable({
  loader: () => import('./InsightsFeedPage'),
  loading: () => <PageLoader />
})

const LoadableInsightsDraftPage = Loadable({
  loader: () => import('./InsightsDraftPage'),
  loading: () => <PageLoader />
})

const tabs = [
  {
    index: `${baseLocation}`,
    content: 'All insights'
  },
  {
    index: `${baseLocation}/my`,
    content: 'My insights'
  },
  {
    index: `${baseLocation}/my/drafts`,
    content: 'My drafts '
  }
]

const feedRoutes = [
  `${baseLocation}/my`,
  `${baseLocation}/tags/:tag`,
  `${baseLocation}/users/:userId`
]

const sortOptions = [{ value: 'Newest' }, { value: 'Popular' }]

const selectOptions = {
  clearable: false,
  searchable: false,
  backspaceRemoves: false,
  deleteRemoves: false,
  escapeClearsValue: false
}

class InsightsPage extends Component {
  state = {
    sort: 'Newest'
  }

  onSortChange = ({ value: sort }) => {
    this.setState({ sort })
  }

  render () {
    const { sort } = this.state
    const {
      location: { pathname },
      isDesktop
    } = this.props

    const sortReducer = SortReducer[sort]
    return (
      <div>
        <div className={styles.header}>
          {isDesktop ? <h1>Insights</h1> : <MobileHeader title='Insights' />}
          {/* <HelpTrendsAbout /> */}
          <div className={styles.header__right}>
            <Select // TODO(vanguard): change to the san-ui dropdown select
              className={styles.sort}
              options={sortOptions}
              value={{ value: sort }}
              valueKey='value'
              labelKey='value'
              onChange={this.onSortChange}
              {...selectOptions}
            />
            <Button className={styles.newSignal} as={Link} to='/insights/new'>
              <Icon type='plus-round' className={styles.newSignal__icon} />
              New insight
            </Button>
          </div>
        </div>
        <Tabs
          options={tabs}
          defaultSelectedIndex={
            pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
          }
          passSelectionIndexToItem
          className={styles.tabs}
          as={({ selectionIndex, ...props }) => (
            <Link {...props} to={selectionIndex} />
          )}
        />
        <Switch>
          {feedRoutes.map((path, index) => (
            <Route
              exact
              key={index}
              path={path}
              render={props => (
                <LoadableInsightsFeedPage
                  sortReducer={sortReducer}
                  {...props}
                />
              )}
            />
          ))}
          <Route
            exact
            path={baseLocation}
            render={props => (
              <LoadableInsightsAllFeedPage
                sortReducer={sortReducer}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`${baseLocation}/my/drafts`}
            component={LoadableInsightsDraftPage}
          />
        </Switch>
      </div>
    )
  }
}

export default InsightsPage
