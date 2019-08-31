import React from 'react'
import {
  createSkeletonElement,
  createSkeletonProvider
} from '@trainline/react-skeletor'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ChartSignalCreationDialog from './ChartSignalCreationDialog'
import PercentChanges from '../../components/PercentChanges'
import WatchlistsPopup from '../../components/WatchlistPopup/WatchlistsPopup'
import ProjectIcon from '../../components/ProjectIcon'
import GetProjects from '../Signals/common/projects/getProjects'
import { TriggerProjectsSelector } from '../Signals/signalFormManager/signalCrudForm/formParts/projectsSelector/TriggerProjectsSelector'
import { formatNumber } from '../../utils/formatting'
import { PROJECT_BY_SLUG_QUERY } from './gql'
import ALL_PROJECTS from '../../allProjects.json'
import styles from './Header.module.scss'

const H1 = createSkeletonElement('h1')

const ProjectInfo = createSkeletonProvider(
  {
    name: '_______'
  },
  ({ name }) => name === undefined,
  () => ({
    color: 'var(--mystic)',
    backgroundColor: 'var(--mystic)'
  })
)(({ name, ticker, description, logoUrl }) => (
  <div className={styles.selector}>
    {logoUrl && logoUrl.includes('https') ? (
      <img src={logoUrl} width={40} height={40} alt='' />
    ) : (
      <ProjectIcon size={40} name={name} ticker={ticker} />
    )}
    <div className={styles.project}>
      <div className={styles.project__top}>
        <H1 className={styles.project__name}>
          {name} ({ticker})
        </H1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-up' />
          <Icon type='arrow-down' />
        </div>
      </div>
      <div className={styles.project__description}>{description}</div>
    </div>
  </div>
))

const ProjectSelector = ({ slug, project, onChange }) => (
  <GetProjects
    render={({ allProjects }) => {
      const array =
        allProjects && allProjects.length === 0 ? ALL_PROJECTS : allProjects

      return (
        <TriggerProjectsSelector
          projects={array}
          target={{ slug }}
          isSingle={true}
          onChange={onChange}
          trigger={() => <ProjectInfo {...project} />}
        />
      )
    }}
  />
)

const Header = ({ data: { project = {} }, slug, isLoggedIn, onSlugSelect }) => {
  const {
    id,
    ticker,
    totalSupply = 0,
    priceUsd = 0,
    percentChange24h = 0,
    percentChange7d = 0
  } = project

  return (
    <div className={styles.wrapper}>
      <ProjectSelector
        slug={slug}
        project={project}
        onChange={([project], closeDialog) => {
          onSlugSelect(project)
          closeDialog()
        }}
      />

      <div className={styles.projectInfo}>
        <div className={cx(styles.column, styles.column__first)}>
          <div className={styles.usdWrapper}>
            <span className={styles.price}>
              {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
            </span>
            <span className={styles.currency}>USD</span>
          </div>
          <div>
            <span>{formatNumber(totalSupply)}</span>
            <span className={styles.currency}>{ticker}</span>
          </div>
        </div>
        <div className={styles.column}>
          <span className={cx(styles.changesLabel, styles.changesLabel__first)}>
            24h change
          </span>
          <PercentChanges changes={percentChange24h} label='24h' />
        </div>
        <div className={styles.column}>
          <span className={styles.changesLabel}>7d change</span>
          <PercentChanges changes={percentChange7d} label='7d' />
        </div>
      </div>

      <div className={styles.actions}>
        <ChartSignalCreationDialog
          slug={slug}
          trigger={
            <Button border className={styles.btn}>
              <Icon type='signal' className={styles.btn__icon} />
              Add signal
            </Button>
          }
        />

        <WatchlistsPopup
          trigger={
            <Button accent='positive' variant='fill'>
              <Icon type='add-watchlist' className={styles.btn__icon} />
              Watch {ticker}
            </Button>
          }
          projectId={id}
          slug={slug}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  )
}

export default graphql(PROJECT_BY_SLUG_QUERY, {
  options: ({ slug }) => ({ variables: { slug } })
})(Header)
