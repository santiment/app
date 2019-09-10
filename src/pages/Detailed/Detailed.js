import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { graphql, Query, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import GeneralInfoBlock from './generalInfo/GeneralInfoBlock'
import FinancialsBlock from './financialInfo/FinancialsBlock'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
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
import './Detailed.css'
import styles from './Detailed.module.scss'

const propTypes = {
  match: PropTypes.object.isRequired
}

export const Breadcrumbs = ({ slug, name }) => (
  <div className={styles.breadcrumbs}>
    <Link to='/assets' className={styles.breadcrumbs__root}>
      Assets
    </Link>
    <Icon type='arrow-right' className={styles.breadcrumbs__arrow} />
    <Link className={styles.breadcrumbs__project} to={`/projects/${slug}`}>
      {name}
    </Link>
  </div>
)

export const Detailed = ({
  match,
  history,
  location,
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
  ...props
}) => {
  const project = Project.project || {}

  const { id } = project

  if (/not found/.test(Project.errorMessage)) {
    return <Redirect to='/' />
  }

  if (Project.error) {
    return <ServerErrorMessage />
  }

  const onChangeProject = (data, callback) => {
    const newProject = Array.isArray(data) ? data[0] : data
    if (newProject && newProject.slug && +newProject.id !== +id) {
      history.replace(`/projects/${newProject.slug}`)
      callback && callback(newProject)
    }
  }

  const projectContainerChart = project && project.id && (
    <>
      <Breadcrumbs slug={project.slug} name={project.name} />
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
              metrics={['historyPrice', 'volume']}
              classes={styles}
              onSlugSelect={onChangeProject}
              isLoggedIn={isLoggedIn}
              enabledViewOnlySharing={false}
              {...boundaries}
            />
          )
        }}
      </Query>
    </>
  )

  return (
    <div className='page detailed'>
      <Helmet>
        <title>
          {Project.loading
            ? 'Sanbase...'
            : `${Project.project.ticker} project page`}
        </title>
        <meta
          property='og:title'
          content={`Project overview: ${Project.project.name} - Sanbase`}
        />
        <meta
          property='og:description'
          content={`Financial, development, on-chain and social data for ${
            Project.project.name
          }. Get access to full historical data & advanced metrics for ${
            Project.project.name
          } by upgrading to Sanbase Dashboards.
`}
        />
      </Helmet>
      <div className={'information'}>
        {projectContainerChart && (
          <Panel className={styles.panel}>{projectContainerChart}</Panel>
        )}
      </div>
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
          <GeneralInfoBlock {...Project.project} />
        </PanelWithHeader>
        <PanelWithHeader header='Financials' className='panel panel-full-width'>
          <FinancialsBlock {...Project.project} />
        </PanelWithHeader>
      </div>
      {isNewsEnabled && !isLoadingNews && !Project.loading && news.length > 0 && (
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
  )
}

Detailed.propTypes = propTypes

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state),
    timeFilter: state.detailedPageUi.timeFilter,
    isNewsEnabled: state.rootUi.isNewsEnabled
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
