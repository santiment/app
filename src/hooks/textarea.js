import { useEffect } from 'react'

const useAutosizeTextArea = (textAreaRef, value, initHeight = 40) => {
  useEffect(() => {
    let textareaEl = textAreaRef.current

    if (textareaEl) {
      textareaEl.style.height = initHeight + 'px'
      const scrollHeight = textareaEl.scrollHeight

      textareaEl.style.height = scrollHeight + 'px'
    }
  }, [textAreaRef, value])
}

export default useAutosizeTextArea
