import React from 'react'
import Button from '@santiment-network/ui/Button'
import { useIntercomClick } from '../../hooks/intercome'

const ContactUs = ({ message, children, ...rest }) => {
  const intercomHandler = useIntercomClick()

  return (
    <Button onClick={() => intercomHandler(message)} {...rest}>
      {children || 'Contact us'}
    </Button>
  )
}

export default ContactUs
