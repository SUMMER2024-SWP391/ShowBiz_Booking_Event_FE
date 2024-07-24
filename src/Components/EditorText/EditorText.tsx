import React, { useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface TextEditorProps {
  value: string
  onChange: (content: string) => void
  readOnly?: boolean
}

const EditorText: React.FC<TextEditorProps> = ({
  value,
  onChange,
  readOnly = false
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  return (
    <div id='#editorcontainer' className='mt-10 min-h-[100px] h-[200px] overflow-y-auto'>
      <ReactQuill
        className='bg-white-A700 !text-black-900 !border-none h-full '
        theme='snow'
        scrollingContainer={'#editorcontainer'}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        modules={modules}
      />
    </div>
  )
}

export default EditorText
