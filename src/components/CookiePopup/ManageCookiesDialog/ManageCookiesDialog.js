import React, { useEffect, useMemo, useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import CookieCheckbox from './CookieCheckbox/CookieCheckbox'
import styles from './ManageCookiesDialog.module.scss'

const ManageCookiesDialog = ({ cookiesPolicies, basePolicy }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activePolicies, setActivePolicies] = useState(['BASIC_COOKIES'])

  useEffect(() => {
    cookiesPolicies.forEach(item => {
      if (localStorage.getItem(item.key)) {
        setActivePolicies(prev => [...prev, item.key])
      }
    })
  }, [])

  const activePoliciesSet = useMemo(() => new Set(activePolicies), [
    activePolicies
  ])

  function handleChange (key) {
    if (activePoliciesSet.has(key)) {
      setActivePolicies(prev => prev.filter(item => item !== key))
    } else {
      setActivePolicies(prev => [...prev, key])
    }
  }

  function handleSaveCookies () {
    activePoliciesSet.forEach(item => {
      localStorage.setItem(item, true)
    })
    localStorage.setItem(basePolicy, true)

    setIsModalOpen(false)
  }

  function handleAllowAll () {
    cookiesPolicies.forEach(item => {
      localStorage.setItem(item.key, true)
    })
    localStorage.setItem(basePolicy, true)

    setIsModalOpen(false)
  }

  return (
    <Dialog
      title='Cookie settings'
      open={isModalOpen}
      onOpen={() => setIsModalOpen(true)}
      onClose={() => setIsModalOpen(false)}
      trigger={null}
      classes={{
        dialog: styles.dialog,
        title: styles.dialogTitle
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.info}>
            When you visit our website, we may store cookies on your browser for
            your security and to help us better understand user behavior and
            inform us about which parts of our website you have visited. The
            information does not usually directly identify you, but it can give
            you a safe and more personalized web experience. Because we respect
            your right to privacy, you can choose not to allow some types of
            cookies. Blocking some types of cookies may impact your experience
            on the site.{' '}
            <a
              href='https://santiment.net/cookies/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              Learn more
            </a>
          </div>
          {cookiesPolicies.map(item => (
            <CookieCheckbox
              isActive={activePoliciesSet.has(item.key)}
              onChange={() => handleChange(item.key)}
              {...item}
            />
          ))}
        </div>
        <div className={styles.actions}>
          <Button variant='fill' accent='positive' onClick={handleSaveCookies}>
            Save cookie settings
          </Button>
          <Button variant='flat' border onClick={handleAllowAll}>
            Allow all
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default ManageCookiesDialog
