import React from 'react'

export const Case = ({ children }) => children

export default ({ case: id, children }) => {
  const childrenArray = React.Children.toArray(children)

  for (let i = 0; i < childrenArray.length; i++) {
    const child = childrenArray[i]
    const { of } = child.props

    if (process.env.NODE_ENV === 'development') {
      if (child.type !== Case) {
        throw new Error(
          '<Switch> component top level children should be a <Case> component',
        )
      }
    }

    if (!of || id === of) {
      return child
    }
  }
}
