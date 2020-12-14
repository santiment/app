import React from 'react'
import CabinetTitle from '../CabinetTitle/CabinetTitle'
import { SheetsTemplatesImg } from '../images'
import ExpansionItem from '../../../../components/ExpansionItem/ExpansionItem'
import { SheetsTemplatesList } from './utils'
import styles from './SheetsTemplates.module.scss'

const SheetsTemplates = () => {
  return (
    <>
      <CabinetTitle
        img={SheetsTemplatesImg}
        title={
          "Expand your comprehension of where markets are heading by using Santiment's PRO templates"
        }
        description={
          'ansheets uses Santiment data to provide context on cryptocurrency price fluctuations, compare which assets have the best upside or lowest risk, and automatically update with precise bullish and bearish signals based on the metrics you rely on most'
        }
      />
      {SheetsTemplatesList.map(
        ({ title, description, linkToTemplate }, index) => (
          <ExpansionItem
            isOpen={index === 0}
            title={title}
            key={index}
            classes={styles}
          >
            <div className={styles.description}>{description}</div>
          </ExpansionItem>
        )
      )}
    </>
  )
}

export default SheetsTemplates
