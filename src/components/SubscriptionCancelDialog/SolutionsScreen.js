import React from 'react'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import ContactUs from '../ContactUs/ContactUs'
import styles from './SolutionsScreen.module.scss'

const SolutionsScreen = ({ closeDialog, nextScreen }) => (
  <Dialog.ScrollContent className={styles.wrapper}>
    <h2 className={styles.title}>Cancel subscription?</h2>
    <section className={styles.section}>
      <p className={styles.text}>Before you go, give us a chance to help you:</p>
      <a className={styles.link} href='https://academy.santiment.net/education-and-use-cases/'>
        Discover use cases on our Academy
      </a>
      <a className={styles.link} href='https://www.youtube.com/c/SantimentNetwork'>
        Gain insights on our Youtube channel
      </a>
      <ContactUs className={styles.link} as='a'>
        Request a custom subscription plan
      </ContactUs>
    </section>
    <div className={styles.actions}>
      <ContactUs variant='fill' accent='positive' onClick={closeDialog} className={styles.btn}>
        Contact Customer service
      </ContactUs>
      <Button accent='positive' onClick={nextScreen}>
        Continue cancellation
      </Button>
    </div>
  </Dialog.ScrollContent>
)

export default SolutionsScreen
