import React from 'react'

export const Case = ({ render: El, children, ...props }) =>
  El ? <El {...props} /> : children

const Switch = ({ case: id, children }) => {
  const childrenArray = React.Children.toArray(children)

  for (let i = 0; i < childrenArray.length; i++) {
    const child = childrenArray[i]
    const { of } = child.props

    if (process.env.NODE_ENV === 'development') {
      if (child.type !== Case) {
        throw new Error(
          `<Switch> should contain only <Case> elements as children, but you passed a <${child
            .type.name || child.type}>`
        )
      }
    }

    if (!of || of === id) {
      return child
    }
  }

  return null
}

export default Switch
