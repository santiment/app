import React from 'react'
import ProjectIcon from './ProjectIcon'
import styles from './ProjectLabel.module.scss'

const ProjectLabel = ({ name, ticker }) => (
  <div>
    <ProjectIcon
      name={name}
      ticker={ticker}
      size={20}
      className='project-icon-default'
    />
    <span className={styles.name}>{name}</span>
    <span className={styles.ticker}>({ticker})</span>
  </div>
)

export default ProjectLabel
