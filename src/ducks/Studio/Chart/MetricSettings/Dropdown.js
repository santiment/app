import React, { useEffect, useState, useRef } from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import styles from './index.module.scss'

export const useDropdown = () => {
  const activeRef = useRef(null)
  const [isOpened, setIsOpened] = useState(false)
  const stateRef = useRef(isOpened)
  stateRef.current = isOpened
  const Dropdown = useRef(props => (
    <ContextMenu
      {...props}
      open={stateRef.current}
      className={styles.tooltip}
      position='bottom'
      on='click'
      onOpen={open}
      onClose={close}
    />
  )).current

  useEffect(
    () => {
      const btn = activeRef.current
      if (isOpened && btn) {
        const { parentNode } = btn

        // NOTE: .scrollIntoView also scrolls the window viewport [@vanguard | Aug 12, 2020]
        parentNode.scrollTop = btn.offsetTop - parentNode.clientHeight / 2
      }
    },
    [isOpened]
  )

  function open () {
    setIsOpened(true)
  }

  function close () {
    setIsOpened(false)
  }

  return {
    activeRef,
    close,
    Dropdown
  }
}
