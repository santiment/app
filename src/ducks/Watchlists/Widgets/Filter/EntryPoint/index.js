import React, { useState, useEffect, useMemo, Fragment } from 'react'
import Panel from '@santiment-network/ui/Panel'
import Search from '@santiment-network/ui/Search'
import Message from '@santiment-network/ui/Message'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import { useFeaturedWatchlists } from '../../../gql/hooks'
import Item from './Item'
import {
  makeHumanReadableState,
  MESSAGES,
  ALL_ASSETS_TEXT,
  MAX_VISIBLE_SYMBOLS
} from './utils'
import styles from './index.module.scss'

const EntryPoint = ({ baseProjects = [] }) => {
  const [state, setState] = useState(
    baseProjects.length > 0 ? baseProjects : ALL_ASSETS_TEXT
  )
  const [categories, loading] = useFeaturedWatchlists()
  const [currentSearch, setCurrentSearch] = useState('')
  const [message, setMessage] = useState(
    state === ALL_ASSETS_TEXT ? MESSAGES.allAssets : ''
  )

  useEffect(
    () => {
      if (!state && message !== MESSAGES.empty) {
        setMessage(MESSAGES.empty)
      }

      if (state === ALL_ASSETS_TEXT && message !== MESSAGES.allAssets) {
        setMessage(MESSAGES.allAssets)
      }

      if (state && state !== ALL_ASSETS_TEXT && message !== '') {
        setMessage('')
      }
    },
    [state]
  )

  const filteredCategories = useMemo(
    () =>
      categories.filter(({ name }) =>
        Array.isArray(state) ? !state.includes(name) : true
      ),
    [state, categories]
  )

  const shortInputState = useMemo(
    () => {
      const text = makeHumanReadableState(state)
      return text.length > MAX_VISIBLE_SYMBOLS
        ? text.slice(0, MAX_VISIBLE_SYMBOLS) + '...'
        : text
    },
    [state]
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.overview}>
        <span className={styles.title}>Entry point: </span>
        <span className={styles.explanation}>
          {makeHumanReadableState(state)}
        </span>
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
            value={shortInputState}
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
          <div className={styles.content}>
            <div className={styles.scroller}>
              {state && (
                <div className={styles.selected}>
                  {state === ALL_ASSETS_TEXT ? (
                    <Item
                      key={'all'}
                      onClick={() => setState(null)}
                      isActive={true}
                      name={ALL_ASSETS_TEXT}
                    />
                  ) : (
                    state.map(name => (
                      <Item
                        key={name}
                        onClick={() =>
                          setState(state.filter(item => item === name))
                        }
                        isActive={true}
                        name={name}
                      />
                    ))
                  )}
                </div>
              )}
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
              <div className={styles.list}>
                <h3 className={styles.heading}>Categories</h3>
                {filteredCategories.map(({ name, id, slug }) => (
                  <Item
                    key={id}
                    onClick={() =>
                      setState(
                        state === ALL_ASSETS_TEXT ? [name] : [...state, name]
                      )
                    }
                    isActive={false}
                    name={name}
                  />
                ))}
              </div>
              <div className={styles.list}>
                <h3 className={styles.heading}>Assets</h3>
                {state !== ALL_ASSETS_TEXT && (
                  <Item
                    key={'all'}
                    onClick={() => setState(ALL_ASSETS_TEXT)}
                    isActive={false}
                    name={ALL_ASSETS_TEXT}
                  />
                )}
              </div>
            </div>
          </div>
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default EntryPoint
