import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { graphql, Query, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import GeneralInfoBlock from './generalInfo/GeneralInfoBlock'
import FinancialsBlock from './financialInfo/FinancialsBlock'
import DetailedHeader from './header/DetailedHeader'
import Panel from '@santiment-network/ui/Panel'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import Search from './../../components/Search/SearchContainer'
import ServerErrorMessage from './../../components/ServerErrorMessage'
import EthSpent from './../../pages/EthSpent'
import { checkIsLoggedIn } from './../UserSelectors'
import DetailedTransactionsTable from './transactionsInfo/DetailedTransactionsTable'
import {
  projectBySlugGQL,
  AllInsightsByTagGQL
} from './gqlWrappers/DetailedGQL'
import { getTimeIntervalFromToday, MONTH } from '../../utils/dates'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import paywallBoundaries from '../Chart/paywallBoundaries'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import './Detailed.css'
import styles from './Detailed.module.scss'

const propTypes = {
  match: PropTypes.object.isRequired
}

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
  isDesktop,
  isLoggedIn,
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
      history.push(`/projects/${newProject.slug}`)
      callback && callback(newProject)
    }
  }

  const chartHeader = ({ onSlugSelect }) => {
    return (
      <DetailedHeader
        onChangeProject={data => {
          onChangeProject(data, onSlugSelect)
        }}
        {...Project}
        isLoggedIn={isLoggedIn}
      />
    )
  }

  const projectContainerChart = project && project.id && (
    <>
      <Query query={USER_SUBSCRIPTIONS_QUERY}>
        {({ data: { currentUser } }) => {
          const subscription = getCurrentSanbaseSubscription(currentUser)
          const userPlan = subscription ? subscription.plan.name : 'FREE'
          const boundaries = paywallBoundaries[userPlan]

          const { slug, id, name } = project

          return (
            <ChartWidget
              {...props}
              history={history}
              location={location}
              adjustNightMode={false}
              slug={slug}
              title={name}
              projectId={id}
              metrics={['historyPrice', 'volume']}
              classes={styles}
              hideSettings={{
                search: true,
                signals: true,
                watchlist: true
              }}
              onSlugSelect={onChangeProject}
              headerComponent={chartHeader}
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
            ? 'SANbase...'
            : `${Project.project.ticker} project page`}
        </title>
        <meta
          property='og:title'
          content={`Project overview: ${Project.project.name} - SANbase`}
        />
        <meta
          property='og:description'
          content={`Financial, development, on-chain and social data for ${
            Project.project.name
          }. Get access to full historical data & advanced metrics for ${
            Project.project.name
          } by upgrading to SANbase Dashboards.
`}
        />
      </Helmet>
      {!isDesktop && <Search />}
      {isDesktop ? (
        <div className={'information'}>
          {projectContainerChart && (
            <Panel className={styles.panel}>{projectContainerChart}</Panel>
          )}
        </div>
      ) : (
        <div>{projectContainerChart}</div>
      )}
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
      {isDesktop &&
        project.isERC20 &&
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
      {isDesktop &&
        project.isERC20 &&
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
    timeFilter: state.detailedPageUi.timeFilter
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
  graphql(AllInsightsByTagGQL, {
    name: 'AllInsights',
    props: ({ AllInsights }) => ({
      Insights: {
        loading: AllInsights.loading,
        error: AllInsights.error || false,
        items: (AllInsights.allInsightsByTag || []).filter(
          insight => insight.readyState === 'published'
        )
      }
    }),
    skip: ({ isLoggedIn, Project: { project = {} } }) => {
      const { ticker } = project
      return !ticker || !isLoggedIn
    },
    options: ({ Project: { project = {} } }) => {
      const { ticker } = project
      return {
        errorPolicy: 'all',
        variables: {
          tag: ticker
        }
      }
    }
  })
)

export default enhance(Detailed)
