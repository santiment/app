import React, { useState, useEffect, useMemo } from 'react'
import Panel from '@santiment-network/ui/Panel'
// import Search from '@santiment-network/ui/Search'
import Message from '@santiment-network/ui/Message'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import { useUserWatchlists } from '../../../gql/hooks'
import { useMessage, useStateMetadata } from './hooks'
import Item from './Item'
import ResetButton from './ResetButton'
import {
  makeHumanReadableState,
  ALL_ASSETS_TEXT,
  MAX_VISIBLE_SYMBOLS
} from './utils'
import styles from './index.module.scss'

const EntryPoint = ({ baseProjects = [], setBaseProjects, isViewMode }) => {
  const [state, setState] = useState(
    baseProjects.length > 0 ? baseProjects : ALL_ASSETS_TEXT
  )
  const [watchlists = []] = useUserWatchlists()
  const { idNameMap, setIdNameMap } = useStateMetadata(state)
  // const [currentSearch, setCurrentSearch] = useState('')
  const { message, updateMessage } = useMessage(state)

  useEffect(
    () => {
      if (Array.isArray(state) && state.length === 0) {
        setState(ALL_ASSETS_TEXT)
      } else {
        updateMessage(state)

        if (state === ALL_ASSETS_TEXT && baseProjects.length !== 0) {
          setBaseProjects([])
        }

        if (
          state !== ALL_ASSETS_TEXT &&
          JSON.stringify(state) !== JSON.stringify(baseProjects)
        ) {
          setBaseProjects(state)
        }
      }
    },
    [state]
  )

  const filteredWatchlists = useMemo(
    () =>
      watchlists.filter(({ id }) => {
        const isInState =
          Array.isArray(state) && state.some(item => item.watchlistId === +id)
        return !isInState
      }),
    [state, watchlists]
  )

  const [inputState, shortInputState] = useMemo(
    () => {
      const text = makeHumanReadableState(state, idNameMap)
      return [
        text,
        text.length > MAX_VISIBLE_SYMBOLS
          ? text.slice(0, MAX_VISIBLE_SYMBOLS) + '...'
          : text
      ]
    },
    [state, idNameMap]
  )

  function addItemInState (item) {
    setState(state === ALL_ASSETS_TEXT ? [item] : [...state, item])
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overview}>
        <span className={styles.title}>Entry point: </span>
        <span className={styles.explanation}>{inputState}</span>
        {!isViewMode && state !== ALL_ASSETS_TEXT && (
          <ResetButton onClick={() => setState(ALL_ASSETS_TEXT)} />
        )}
      </div>
      {!isViewMode && (
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
            {/* <Search */}
            {/*   autoFocus */}
            {/*   onChange={value => setCurrentSearch(value)} */}
            {/*   placeholder='Type to search' */}
            {/*   className={styles.search} */}
            {/* /> */}
            <div className={styles.content}>
              <div className={styles.scroller}>
                {state !== ALL_ASSETS_TEXT && (
                  <div className={styles.selected}>
                    {state.map(item => {
                      const name =
                        idNameMap[item['watchlistId']] ||
                        item['watchlistId'] ||
                        item
                      return (
                        <Item
                          key={name}
                          onClick={() =>
                            setState(
                              state.filter(currItem => currItem !== item)
                            )
                          }
                          isActive={true}
                          name={name}
                        />
                      )
                    })}
                  </div>
                )}
                {filteredWatchlists.length > 0 && (
                  <div className={styles.list}>
                    <h3 className={styles.heading}>My watchlists</h3>
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
                    {filteredWatchlists.map(({ name, id, slug }) => (
                      <Item
                        key={id}
                        onClick={() => {
                          setIdNameMap({ ...idNameMap, [+id]: name })
                          addItemInState({ watchlistId: +id })
                        }}
                        name={name}
                        isDisabled={message}
                        id={id}
                        slug={slug}
                      />
                    ))}
                  </div>
                )}
                {/* <div className={styles.list}> */}
                {/*   <h3 className={styles.heading}>Assets</h3> */}
                {/* </div> */}
              </div>
            </div>
          </Panel>
        </ContextMenu>
      )}
    </div>
  )
}

export default EntryPoint
