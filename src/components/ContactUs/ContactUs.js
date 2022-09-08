import React from 'react'
import Button from '@santiment-network/ui/Button'
import { useIntercomClick } from '../../hooks/intercome'

const ContactUs = ({ message, children, onClick, ...rest }) => {
  const intercomHandler = useIntercomClick()

  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        intercomHandler(message)
        onClick && onClick()
      }}
      {...rest}
    >
      {children || 'Contact us'}
    </Button>
  )
}

export default ContactUs
