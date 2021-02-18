import { useCallback, useState } from 'react'

export const useDialogState = (defaultOpen = false) => {
  const [isOpened, setOpen] = useState(defaultOpen)
  const openDialog = useCallback(() => setOpen(true), [setOpen])
  const closeDialog = useCallback(() => setOpen(false), [setOpen])

  const toggleOpen = useCallback(value => setOpen(value), [setOpen])

  return { isOpened, openDialog, closeDialog, toggleOpen }
}
