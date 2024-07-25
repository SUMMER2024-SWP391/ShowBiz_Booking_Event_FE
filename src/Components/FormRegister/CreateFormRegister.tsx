import React, { useState } from 'react'
import { Text } from '../Text/Text'
import InputVerTwo from '../InputVerTwo/InputVerTwo'
import InputQuestion from '../InputQuestion/InputQuestion'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { formAPI } from 'src/apis/form.api'
import { EventQuestionType } from 'src/@types/form.type'
import { toast } from 'react-toastify'

type Question = {
  _id: string
  description: string
  messageError: string
}

type FormRegister = {
  questions: Array<Question>
}

const initForm: FormRegister = {
  questions: [
    {
      _id: new Date().toISOString(),
      description: '',
      messageError: ''
    }
  ]
}
type Props = {
  isHaveForm: boolean

}
export const CreateFormRegister = ({ isHaveForm }: Props) => {
  const [form, setForm] = useState<FormRegister>(initForm)
  const { id } = useParams()

  const createFormEventRegisterMutation = useMutation({
    mutationFn: ({ id, body }: { id?: string; body: { questions: Array<string>; type: EventQuestionType } }) => {
      if (isHaveForm) {
        return formAPI.addNewQuestion(id as string, body)
      } else {
        return formAPI.createForm(id as string, body)
      }
    }
  })

  // const handleNewQuestion = () => {
  //   const question = {
  //     _id: new Date().toISOString(),
  //     description: '',
  //     messageError: ''
  //   }

  //   setForm((prevForm) => {
  //     const newQuestions = form.questions
  //     newQuestions.push(question)
  //     return {
  //       ...prevForm,
  //       questions: newQuestions
  //     }
  //   })
  // }

  const handleChangeElement = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((question) => {
        if (question._id === id) {
          return { ...question, description: value }
        }
        return question
      })
    }))
  }

  // const handleDeleteQuestion = (id: string) => () => {
  //   setForm((prevForm) => {
  //     const listQuestion = prevForm.questions
  //     const result = listQuestion.filter((question) => question._id !== id)

  //     return {
  //       ...prevForm,
  //       questions: result
  //     }
  //   })
  // }

  const handleValidateQuestion = (): {
    listQuestionError: Array<Question>
    count: number
  } => {
    const listQuestionError = form.questions
    let count = 0
    listQuestionError.map((question) => {
      if (!question.description) {
        count++
        return (question.messageError = 'This field is required')
      }
      return question
    })

    return { listQuestionError, count }
  }

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const result = handleValidateQuestion()

    if (result.count > 0) {
      setForm((prevForm) => ({
        ...prevForm,
        questions: result.listQuestionError
      }))
      return
    }

    const questions: Array<string> = []
    for (let index = 0; index < form.questions.length; index++) {
      questions.push(form.questions[index].description)
    }

    createFormEventRegisterMutation.mutate(
      {
        id,
        body: {
          questions,
          type: EventQuestionType.REGISTER
        }
      },
      {
        onSuccess: (data) => {
          console.log(data)
          toast.success('Create form register event sucessfully')
          
        }
      }
    )
   
  }
  console.log(form.questions[0])

  return (
    <div className='mt-5  flex flex-col'>
      <div className='flex flex-row '>
        <div className=' rounded-xl p-3 bg-gray-500'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className='w-[14px] h-[14px] text-white-A700'>
            <path
              fill='currentColor'
              fill-rule='evenodd'
              d='M8 14.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C1.501 10.403 1.5 9.425 1.5 8s.001-2.403.063-3.162c.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318C5.597 1.501 6.575 1.5 8 1.5s2.403.001 3.162.063c.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162s-.001 2.403-.063 3.162c-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063M0 8c0-2.8 0-4.2.545-5.27A5 5 0 0 1 2.73.545C3.8 0 5.2 0 8 0s4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C16 3.8 16 5.2 16 8s0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C12.2 16 10.8 16 8 16s-4.2 0-5.27-.545A5 5 0 0 1 .545 13.27C0 12.2 0 10.8 0 8m7.04 1.1L8 6.222 8.96 9.1zm2.748 2.487L9.46 10.6H6.541l-.33.987a.75.75 0 0 1-1.423-.474l.5-1.5 1.526-4.577c.38-1.14 1.992-1.14 2.372 0l1.525 4.577.5 1.5a.75.75 0 0 1-1.423.474'
              clip-rule='evenodd'
            ></path>
          </svg>
        </div>
        <div className='ml-3'>
          <Text size='s' as='p' className='!text-[16px] !font-medium'>
            Text
          </Text>
          <Text size='s' as='p' className='mt-1 !text-[13px] opacity-50'>
            Collect a short, single-line answer
          </Text>
        </div>
      </div>
      <Text as='p' size='xl' className='mt-3 !text-[14px]'>
        Question
      </Text>
      <form className='flex flex-col'>
        <InputQuestion question={form.questions[0]} handleChangeElement={handleChangeElement} />
        <button
          type='submit'
          className='mt-10 px-4 py-2 text-white-A700 bg-gray-700 hover:opacity-90 rounded-xl hover:text-slate-300  hover:border-gray-700 duration-300 disabled:opacity-75'
          disabled={form.questions.length !== 0 ? false : true}
          onClick={handleSubmit}
        >
          Add New Questions
        </button>
      </form>
    </div>
  )
}
