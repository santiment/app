import React from 'react'
import Template from '../../ducks/Studio/Template/Dialog/LoadTemplate/Template'
import styles from './TemplateCard.module.scss'

const TemplateCard = ({ template, isAuthor }) => {
  return (
    <div className={styles.card}>
      <Template template={template} isAuthor={isAuthor} />
    </div>
  )
}

export default TemplateCard
