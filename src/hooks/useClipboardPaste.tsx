import { useCallback, useState } from 'react'

const useClipboardPaste = () => {
  const [pastedText, setPastedText] = useState<string>('')
  const patseFormClipboard = useCallback(async () => {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText()
      setPastedText(text)
    } else {
      console.error('Clipboard is error')
    }
  }, [])
  return [pastedText, patseFormClipboard]
}

export default useClipboardPaste
