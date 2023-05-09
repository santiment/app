import { useEffect } from 'react';

const useAutosizeTextArea = ({
  textareaRef,
  wrapperRef,
  value,
  initHeight = 40
}) => {
  useEffect(() => {
    let textareaEl = textareaRef.current;
    let wrapperEl = wrapperRef.current;

    if (textareaEl) {
      textareaEl.style.height = initHeight + 'px';
      const scrollHeight = textareaEl.scrollHeight;
      textareaEl.style.height = scrollHeight + 'px';
    }

    if (wrapperEl) {
      wrapperEl.style.height = initHeight + 'px';
      const scrollHeight = textareaEl.scrollHeight;
      wrapperEl.style.height = scrollHeight + 'px';
    }
  }, [textareaRef, wrapperRef, value]);
};

export default useAutosizeTextArea;