import React from 'react'
import TemplateCard from '../TemplateCard/TemplateCard'
import styles from './TemplatesGrid.module.scss'

const TemplatesGrid = ({ templates, isAuthor }) => {
  return (
    <div className={styles.grids}>
      {templates.map(template => (
        <TemplateCard
          key={template.id}
          template={template}
          isAuthor={isAuthor}
        />
      ))}
    </div>
  )
}

export default TemplatesGrid
