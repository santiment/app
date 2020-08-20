import { useCallback, useState } from 'react'

export const useDialogState = () => {
  const [isOpened, setOpen] = useState(false)
  const openDialog = useCallback(() => setOpen(true), [setOpen])
  const closeDialog = useCallback(() => setOpen(false), [setOpen])

  return { isOpened, openDialog, closeDialog }
}
