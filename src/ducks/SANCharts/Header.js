import React from 'react'
import { graphql } from 'react-apollo'
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
import styles from './Header.module.scss'

const Changes = ({ small = false, className, children, diff, label }) => (
  <div className={styles[small ? 'changes_small' : 'changes']}>
    {children}
    <PercentChanges className={className} changes={diff} />
    {label}
  </div>
)

const ProjectInfo = ({ name, ticker, description }) => (
  <div className={styles.selector}>
    <ProjectIcon name={name} ticker={ticker} size={40} />
    <div className={styles.project}>
      <div className={styles.project__top}>
        <h1 className={styles.project__name}>
          {name} ({ticker})
        </h1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-up' />
          <Icon type='arrow-down' />
        </div>
      </div>
      <div className={styles.project__description}>{description}</div>
    </div>
  </div>
)

const ProjectSelector = ({ slug, project, onChange }) => (
  <GetProjects
    render={({ allProjects }) => {
      return (
        <TriggerProjectsSelector
          projects={allProjects}
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
        onChange={([project]) => onSlugSelect(project)}
      />

      <div>
        <Changes diff={percentChange24h} label='24h' className={styles.change}>
          {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
        </Changes>
        <Changes
          small
          diff={percentChange7d}
          label='7d'
          className={styles.change_small}
        >
          {formatNumber(totalSupply)} {ticker}
        </Changes>
      </div>

      {isLoggedIn && (
        <div>
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
      )}
    </div>
  )
}

export default graphql(PROJECT_BY_SLUG_QUERY, {
  options: ({ slug }) => ({ variables: { slug } })
})(Header)
