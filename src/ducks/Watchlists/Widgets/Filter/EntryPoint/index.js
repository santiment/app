import React, { useState } from 'react'
import Panel from '@santiment-network/ui/Panel'
import Search from '@santiment-network/ui/Search'
import Message from '@santiment-network/ui/Message'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import styles from './index.module.scss'

const ALL_ASSETS_TEXT = 'All assets'

const MESSAGES = {
  allAssets: 'Deselect ‘All assets’ to customize your Screener',
  empty: 'Please select at least one filter'
}

const EntryPoint = ({ baseProjects }) => {
  const state = baseProjects || ALL_ASSETS_TEXT

  const [currentSearch, setCurrentSearch] = useState('')
  const [message, setMessage] = useState(
    state === ALL_ASSETS_TEXT ? MESSAGES.allAssets : ''
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.overview}>
        <span className={styles.title}>Entry point: </span>
        <span className={styles.explanation}>{state}</span>
      </div>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        align='start'
        className={styles.dropdown}
        trigger={
          <Input
            readOnly
            className={styles.trigger__btn}
            iconClassName={styles.trigger__arrow}
            icon='arrow-down'
            iconPosition='right'
            defaultValue={state}
          />
        }
      >
        <Panel className={styles.panel}>
          <Search
            autoFocus
            onChange={value => setCurrentSearch(value)}
            placeholder='Type to search'
            className={styles.search}
          />
          <div className={styles.selected}>a;;</div>
          {message && (
            <Message
              variant='warn'
              icon='info-round'
              fill={false}
              className={styles.message}
            >
              {message}
            </Message>
          )}
          <div className={styles.watchlists}>fff</div>
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default EntryPoint
