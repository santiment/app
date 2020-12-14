import React from 'react'
import ExpansionItem from '../../../../../../components/ExpansionItem/ExpansionItem'
import { SheetsTemplatesList } from './utils'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './SheetsTemplates.module.scss'

const SheetsTemplates = () => {
  return (
    <>
      {SheetsTemplatesList.map(
        ({ title, description, linkToTemplate }, index) => (
          <ExpansionItem
            isOpen={index === 0}
            title={title}
            key={index}
            classes={styles}
          >
            <div className={styles.description}>
              <div>{description}</div>

              {linkToTemplate && (
                <Button
                  as='a'
                  target='_blank'
                  href={linkToTemplate}
                  accent='positive'
                  variant='fill'
                  className={styles.btn}
                >
                  Open Template
                  <Icon type='external-link' className={styles.external} />
                </Button>
              )}
            </div>
          </ExpansionItem>
        )
      )}
    </>
  )
}

export default SheetsTemplates
