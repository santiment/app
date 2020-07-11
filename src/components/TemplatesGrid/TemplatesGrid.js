import React from 'react'
import Template from '../../ducks/Studio/Template/Dialog/LoadTemplate/Template'
import { sortById } from '../../utils/sortMethods'
import styles from './TemplatesGrid.module.scss'

const TemplatesGrid = ({ templates }) => {
  return (
    <>
      {templates.sort(sortById).map(template => (
        <Template
          key={template.id}
          template={template}
          className={styles.card}
          asLink
        />
      ))}
    </>
  )
}

export default TemplatesGrid
