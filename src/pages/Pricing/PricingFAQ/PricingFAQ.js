import React from 'react'
import { PlanDescriptionSvg } from '../../../components/Illustrations/PlanDescriptionSvg'
import styles from './PricingFAQ.module.scss'
import ExpansionItem from '../../../components/ExpansionItem/ExpansionItem'

const QUESTIONS = [
  {
    title: 'Viverra ornare adipiscing nibh amet augue',
    descr:
      'Aliquam, scelerisque adipiscing posuere eu ultrices hendrerit pellentesque feugiat. Volutpat accumsan, in posuere venenatis tellus in. Nisl augue arcu, elementum gravida aliquet lacus blandit donec ullamcorper. Aliquam justo faucibus lorem massa arcu. Accumsan mattis pretium molestie nisi, sed. Ac et, enim, ultrices convallis non. In ultrices vulputate nunc, quis amet, nibh nunc cras sit. Viverra ornare adipiscing nibh amet augue odio felis. Ultrices interdum nunc ornare aenean euismod.'
  },
  {
    title: 'Viverra ornare adipiscing nibh amet augue',
    descr:
      'Aliquam, scelerisque adipiscing posuere eu ultrices hendrerit pellentesque feugiat. Volutpat accumsan, in posuere venenatis tellus in. Nisl augue arcu, elementum gravida aliquet lacus blandit donec ullamcorper. Aliquam justo faucibus lorem massa arcu. Accumsan mattis pretium molestie nisi, sed. Ac et, enim, ultrices convallis non. In ultrices vulputate nunc, quis amet, nibh nunc cras sit. Viverra ornare adipiscing nibh amet augue odio felis. Ultrices interdum nunc ornare aenean euismod.'
  },
  {
    title: 'Viverra ornare adipiscing nibh amet augue',
    descr:
      'Aliquam, scelerisque adipiscing posuere eu ultrices hendrerit pellentesque feugiat. Volutpat accumsan, in posuere venenatis tellus in. Nisl augue arcu, elementum gravida aliquet lacus blandit donec ullamcorper. Aliquam justo faucibus lorem massa arcu. Accumsan mattis pretium molestie nisi, sed. Ac et, enim, ultrices convallis non. In ultrices vulputate nunc, quis amet, nibh nunc cras sit. Viverra ornare adipiscing nibh amet augue odio felis. Ultrices interdum nunc ornare aenean euismod.'
  }
]

const PricingFAQ = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>{PlanDescriptionSvg}</div>

      <div className={styles.header}>Frequently Asked Questions</div>

      <div className={styles.list}>
        {QUESTIONS.map(({ title, descr }, index) => (
          <ExpansionItem
            isOpen={index === 0}
            title={title}
            key={index}
            classes={styles}
          >
            <div className={styles.description}>{descr}</div>
          </ExpansionItem>
        ))}
      </div>
    </div>
  )
}

export default PricingFAQ
