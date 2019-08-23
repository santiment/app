import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { TriggerProjectsSelector } from '../../../ducks/Signals/signalFormManager/signalCrudForm/formParts/projectsSelector/TriggerProjectsSelector'
import GetProjects from '../../../ducks/Signals/common/projects/getProjects'
import styles from './HeaderProjectsSelector.module.scss'

const HeaderProjectsSelector = ({
  onChange,
  project: { slug: projectSlug }
}) => (
  <GetProjects
    render={({ allProjects }) => {
      return (
        <TriggerProjectsSelector
          projects={allProjects}
          target={{ slug: projectSlug }}
          isSingle={true}
          onChange={onChange}
          trigger={HeaderProjectsTrigger}
        />
      )
    }}
  />
)

const HeaderProjectsTrigger = () => (
  <Button className={styles.icons}>
    <Icon type='arrow-up' />
    <Icon type='arrow-down' />
  </Button>
)

export default HeaderProjectsSelector
