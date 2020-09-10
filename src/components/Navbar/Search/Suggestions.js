import React from 'react'
import AssetsCategory from './AssetsCategory'

const Suggestions = props => {
  return (
    <>
      <AssetsCategory {...props} />
      <AssetsCategory {...props} />
      <AssetsCategory {...props} />
      <AssetsCategory {...props} />
    </>
  )
}

export default Suggestions
