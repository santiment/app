import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import cx from 'classnames'
import { graphql, Query, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import GeneralInfoBlock from './generalInfo/GeneralInfoBlock'
import FinancialsBlock from './financialInfo/FinancialsBlock'
import Panel from '@santiment-network/ui/Panel'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import ServerErrorMessage from './../../components/ServerErrorMessage'
import EthSpent from './../../pages/EthSpent'
import { checkIsLoggedIn } from './../UserSelectors'
import DetailedTransactionsTable from './transactionsInfo/DetailedTransactionsTable'
import { projectBySlugGQL } from './gqlWrappers/DetailedGQL'
import { NEWS_QUERY } from '../../components/News/NewsGQL'
import News from '../../components/News/News'
import { getTimeIntervalFromToday, MONTH, DAY } from '../../utils/dates'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import paywallBoundaries from '../Chart/paywallBoundaries'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import PageLoader from '../../components/Loader/PageLoader'
import { Metrics } from '../../ducks/SANCharts/data'
import './Detailed.css'
import styles from './Detailed.module.scss'
import Breadcrumbs from '../profile/breadcrumbs/Breadcrumbs'

export const DetailedBreadcrumbs = ({ from, name }) => (
  <Breadcrumbs
    from={from}
    className={styles.breadcrumbs}
    crumbs={[
      {
        label: 'Market',
        to: '/assets'
      },
      {
        label: 'Assets',
        to: '/assets'
      },
      {
        label: name
      }
    ]}
  />
)

export const Detailed = ({
  match,
  history,
  location = {},
  Project = {
    project: undefined,
    loading: true,
    error: false,
    errorMessage: ''
  },
  isLoggedIn,
  isNewsEnabled,
  isLoadingNews,
  news,
  isWideChart,
  ...props
}) => {
  const { loading, errorMessage, error, project = {} } = Project

  const { from } = location.state || {}
  const { id } = project

  if (/not found/.test(errorMessage)) {
    return <Redirect to='/' />
  }

  if (error) {
    return <ServerErrorMessage />
  }

  if (!id) {
    return (
      <div className='page detailed'>
        <PageLoader />
      </div>
    )
  }

  const onChangeProject = (data, callback) => {
    const newProject = Array.isArray(data) ? data[0] : data
    if (newProject && newProject.slug && +newProject.id !== +id) {
      history.replace(`/projects/${newProject.slug}`)
      callback && callback(newProject)
    }
  }

  const projectContainerChart = id && (
    <>
      <DetailedBreadcrumbs
        from={from}
        slug={project.slug}
        name={project.name}
      />
      <Query query={USER_SUBSCRIPTIONS_QUERY}>
        {({ data: { currentUser } = {} }) => {
          const subscription = getCurrentSanbaseSubscription(currentUser)
          const userPlan = subscription ? subscription.plan.name : 'FREE'
          const boundaries = paywallBoundaries[userPlan]

          const { slug, id, name, ticker } = project

          return (
            <ChartWidget
              isControlled
              {...props}
              history={history}
              location={location}
              adjustNightMode={false}
              showToggleAnomalies={true}
              slug={slug}
              title={`${name} (${ticker})`}
              projectId={id}
              metrics={[Metrics.historyPrice, Metrics.volume]}
              classes={styles}
              onSlugSelect={onChangeProject}
              isLoggedIn={isLoggedIn}
              enabledViewOnlySharing={false}
              isPRO={userPlan === 'PRO'}
              isParentLoading={loading}
              {...boundaries}
            />
          )
        }}
      </Query>
    </>
  )

  return (
    <div className={!isWideChart && 'page detailed'}>
      <Helmet>
        <title>
          {loading ? 'Sanbase...' : `${project.ticker} project page`}
        </title>
        <meta
          property='og:title'
          content={`Project overview: ${project.name} - Sanbase`}
        />
        <meta
          property='og:description'
          content={`Financial, development, on-chain and social data for ${
            project.name
          }. Get access to full historical data & advanced metrics for ${
            project.name
          } by upgrading to Sanbase Dashboards.
`}
        />
      </Helmet>
      <div className={cx('information', styles.chart)}>
        {projectContainerChart && (
          <Panel className={styles.panel}>{projectContainerChart}</Panel>
        )}
      </div>

      <div className={cx('page', 'detailed', styles.tables)}>
        {project.slug === 'ethereum' && (
          <div className='information'>
            <EthSpent />
          </div>
        )}
        <div className='information'>
          <PanelWithHeader
            header='General Info'
            className='panel panel-full-width'
          >
            <GeneralInfoBlock {...project} />
          </PanelWithHeader>
          <PanelWithHeader
            header='Financials'
            className='panel panel-full-width'
          >
            <FinancialsBlock {...project} />
          </PanelWithHeader>
        </div>
        {isNewsEnabled && !isLoadingNews && !loading && news.length > 0 && (
          <div className={styles.newsWrapper}>
            <h4 className={styles.newsTitle}>News</h4>
            <News data={news} />
          </div>
        )}
        {project.isERC20 &&
          project.tokenTopTransactions &&
          project.tokenTopTransactions.length > 0 && (
          <div className='information'>
            <DetailedTransactionsTable
              Project={Project}
              title={'Top token transactions, 30d'}
              show={'tokenTopTransactions'}
            />
          </div>
        )}
        {project.isERC20 &&
          project.ethTopTransactions &&
          project.ethTopTransactions.length > 0 && (
          <div className='information'>
            <DetailedTransactionsTable
              Project={Project}
              show={'ethTopTransactions'}
            />
          </div>
        )}
      </div>
    </div>
  )
}

Detailed.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state),
    timeFilter: state.detailedPageUi.timeFilter,
    isNewsEnabled: state.rootUi.isNewsEnabled,
    isWideChart: state.rootUi.isWideChartEnabled
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withApollo,
  graphql(projectBySlugGQL, {
    name: 'Project',
    props: ({ Project }) => {
      const { projectBySlug = {} } = Project

      return {
        Project: {
          loading: Project.loading,
          empty: !Project.hasOwnProperty('project'),
          error: Project.error,
          errorMessage: Project.error ? Project.error.message : '',
          project: {
            ...projectBySlug,
            isERC20:
              projectBySlug.mainContractAddress &&
              projectBySlug.infrastructure === 'ETH'
          }
        }
      }
    },
    options: ({ match }) => {
      const { from: fromOverTime, to } = getTimeIntervalFromToday(-24, MONTH)
      const { from } = getTimeIntervalFromToday(-1, MONTH)

      return {
        variables: {
          slug: match.params.slug,
          from: from.toISOString(),
          to: to.toISOString(),
          fromOverTime: fromOverTime.toISOString(),
          interval: '7d'
        }
      }
    }
  }),
  graphql(NEWS_QUERY, {
    skip: ({ isNewsEnabled }) => !isNewsEnabled,
    options: ({ match }) => {
      const { from, to } = getTimeIntervalFromToday(-14, DAY)
      return {
        variables: { from, to, tag: match.params.slug, size: 6 }
      }
    },
    props: ({ data: { news = [], loading } }) => ({
      news: news.reverse(),
      isLoadingNews: loading
    })
  })
)

export default enhance(Detailed)
