import { useCallback } from 'react'

const useClipboardCopy = () => {
  const copyClipboard = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('Text copied to clipboard')
        })
        .catch(() => {
          console.warn('something error')
        })
    } else {
      console.error('Clipboard is error')
    }
  }, [])
  return copyClipboard
}

export default useClipboardCopy
