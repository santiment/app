export const useIntercomClick = () => {
  return message => {
    if (window.Intercom) {
      if (message && typeof message === 'string') {
        window.Intercom('showNewMessage', message)
      } else {
        window.Intercom('show')
      }
    } else {
      window.open('/support', '_blank')
    }
  }
}
