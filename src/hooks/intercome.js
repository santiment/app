const onOpenIntercome = message => {
  if (window.Intercom) {
    if (message) {
      window.Intercom('show')
    } else {
      window.Intercom('showNewMessage', message)
    }
  } else {
    window.open('/support', '_blank')
  }
}

export const useIntercomClick = () => {
  return onOpenIntercome
}
