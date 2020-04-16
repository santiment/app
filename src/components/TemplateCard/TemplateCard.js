import React from 'react'
import Template from '../../ducks/Studio/Template/Dialog/LoadTemplate/Template'
import styles from './TemplateCard.module.scss'

const TemplateCard = ({ template }) => {
  return (
    <div className={styles.card}>
      <Template template={template} />
    </div>
  )
}

export default TemplateCard
