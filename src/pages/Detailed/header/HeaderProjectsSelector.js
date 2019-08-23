import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { TriggerProjectsSelector } from '../../../ducks/Signals/signalFormManager/signalCrudForm/formParts/projectsSelector/TriggerProjectsSelector'
import GetProjects from '../../../ducks/Signals/common/projects/getProjects'
import styles from './HeaderProjectsSelector.module.scss'
import ProjectIcon from '../../../components/ProjectIcon'

const HeaderProjectsSelector = ({
  onChange,
  project: { slug: projectSlug, name, ticker, description }
}) => {
  const headerTrigger = () => {
    return (
      <div className={styles.trigger}>
        <ProjectIcon name={name} ticker={ticker} size={40} />
        <div className={styles.name}>
          <div className={styles.projectSelector}>
            <h1 className={styles.h1}>
              {name} ({ticker})
            </h1>
            <Button className={styles.icons}>
              <Icon type='arrow-up' />
              <Icon type='arrow-down' />
            </Button>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    )
  }

  return (
    <GetProjects
      render={({ allProjects }) => {
        return (
          <TriggerProjectsSelector
            projects={allProjects}
            target={{ slug: projectSlug }}
            isSingle={true}
            onChange={onChange}
            trigger={headerTrigger}
          />
        )
      }}
    />
  )
}

export default HeaderProjectsSelector
