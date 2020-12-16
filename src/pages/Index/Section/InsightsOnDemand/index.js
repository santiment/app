import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { insights } from './insights'
import { Section, Container } from '../index'
import Accordion from '../../Accordion'
import styles from './index.module.scss'

const InsightsOnDemand = () => (
  <Section title='Insights on demand'>
    <Container>
      {insights.map(({ title, widget, url }) => (
        <Accordion key={url} title={title}>
          {widget()}
          <Button
            as='a'
            target='_blank'
            href={url}
            accent='positive'
            variant='fill'
            className={styles.btn}
          >
            Open Chart
            <Icon type='external-link' className={styles.external} />
          </Button>
        </Accordion>
      ))}
    </Container>
  </Section>
)

export default InsightsOnDemand
