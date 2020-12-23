const onOpenIntercome = message => {
  if (window.Intercom) {
    if (message) {
      window.Intercom('showNewMessage', message)
    } else {
      window.Intercom('show')
    }
  } else {
    window.open('/support', '_blank')
  }
}

export const useIntercomClick = () => {
  return onOpenIntercome
}
