import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import ContactUs from '../ContactUs/ContactUs'
import styles from './index.module.scss'

const ResearchesBlock = ({ className }) => (
  <section className={cx(styles.wrapper, className)}>
    <div className={styles.content}>
      <div className={styles.block}>
        <h4 className={styles.heading}>Researchers</h4>
        <p className={styles.desc}>
          Need data to support your crypto market analysis? Tap into on-chain,
          social media and development indicators on over 1000 cryptocurrencies
          via our{' '}
          <a
            href='https://sheets.santiment.net/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            Google spreadsheet plugin
          </a>
          , through our{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
            href='https://neuro.santiment.net/'
          >
            unified API
          </a>{' '}
          or directly on charts in Sanbase Studio.
        </p>
        <Button
          border
          className={styles.button}
          as={Link}
          to={'/studio'}
          target='_blank'
          rel='noopener noreferrer'
        >
          Go to Studio
        </Button>
      </div>
      <div className={styles.block}>
        <h4 className={styles.heading}>Reporters</h4>
        <p className={styles.desc}>
          Want to give more context about crypto market events to your audience?
          We help content creators big and small elevate their market coverage
          with hard data and explore new, untapped market storylines.
        </p>
        <ContactUs border className={styles.button} />
      </div>
    </div>
  </section>
)

export default ResearchesBlock
