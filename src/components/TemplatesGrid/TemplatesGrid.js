import React from 'react'
import styles from './TemplatesGrid.module.scss'
import Template from '../../ducks/Studio/Template/Dialog/LoadTemplate/Template'

const TemplatesGrid = ({ templates, isAuthor }) => {
  return (
    <>
      {templates.map(template => (
        <Template
          key={template.id}
          template={template}
          isAuthor={isAuthor}
          className={styles.card}
        />
      ))}
    </>
  )
}

export default TemplatesGrid
