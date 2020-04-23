import React from 'react'
import styles from './TemplatesGrid.module.scss'
import Template from '../../ducks/Studio/Template/Dialog/LoadTemplate/Template'
import {sortById} from "../../utils/sortMethods";

const TemplatesGrid = ({ templates, isAuthor }) => {
  return (
    <>
      {templates
        .sort(sortById)
        .map(template => (
        <Template
          key={template.id}
          template={template}
          isAuthor={isAuthor}
          className={styles.card}
          asLink
        />
      ))}
    </>
  )
}

export default TemplatesGrid
