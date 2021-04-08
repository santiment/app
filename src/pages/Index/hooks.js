import { useHistory } from 'react-router-dom'
import { useDebounceEffect } from '../../hooks'

function hashLinkScroll ({ location }) {
  const { hash } = location
  if (hash !== '') {
    const elements = document.querySelectorAll(`a[href='/${hash}']`)
    if (elements && elements.length > 0) {
      elements[0].scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}

export const useAnchorLoading = (deps, scrollAnchors) => {
  const history = useHistory()

  useDebounceEffect(
    () => {
      if (scrollAnchors.indexOf(history.location.hash) !== -1) {
        hashLinkScroll(history)
      }
    },
    1000,
    [history.location, scrollAnchors, ...deps]
  )
}
