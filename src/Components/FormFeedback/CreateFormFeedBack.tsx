import { useMutation } from '@tanstack/react-query'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { EventQuestionType } from 'src/@types/form.type'

import { formAPI } from 'src/apis/form.api'
import EventOfForm from '../EventOfForm/EventOfForm'
import InputQuestion from '../InputQuestion/InputQuestion'
import { Heading } from '../Heading/Heading'

type Question = {
  _id: string
  description: string
  messageError: string
}

type FormFeedBack = {
  questions: Array<Question>
}

const initForm: FormFeedBack = {
  questions: [
    {
      _id: new Date().toISOString(),
      description: '',
      messageError: ''
    }
  ]
}
type Props ={
  isHaveForm: boolean
}
const CreateFormFeedBack = ({isHaveForm}: Props) => {
  const [form, setForm] = useState<FormFeedBack>(initForm)
  const { id } = useParams()

  const createFormEventFeedBackMutation = useMutation({
    mutationFn: ({
      id,
      body
    }: {
      id?: string
      body: { questions: Array<string>; type: EventQuestionType }
    }) => {if(isHaveForm){ return formAPI.addNewQuestion(id as string, body)}else{return formAPI.createForm(id as string, body)}}
  })
  
  const handleNewQuestion = () => {
    const question = {
      _id: new Date().toISOString(),
      description: '',
      messageError: ''
    }

    setForm((prevForm) => {
      const newQuestions = form.questions
      newQuestions.push(question)
      return {
        ...prevForm,
        questions: newQuestions
      }
    })
  }

  const handleChangeElement =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleDeleteQuestion = (id: string) => () => {
    setForm((prevForm) => {
      const listQuestion = prevForm.questions
      const result = listQuestion.filter((question) => question._id !== id)

      return {
        ...prevForm,
        questions: result
      }
    })
  }

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

    createFormEventFeedBackMutation.mutate(
      {
        id,
        body: {
          questions,
          type: EventQuestionType.FEEDBACK
        }
      },
      {
        onSuccess: (data) => {
          console.log(data)
          toast.success('Create form feedback event sucessfully')
        }
      }
    )
  }

  return (
    <>
      <div className='mt-10 flex flex-col justify-center items-center w-[95%]'>
        <Heading>Create Form Feedback</Heading>
        <div>
          {' '}
          <button
            type='button'
            className='mt-8 w-[300px] h-[54px] text-white-A700 bg-[#41B06E] hover:opacity-90 rounded-xl hover:text-slate-300 hover:border-gray-700 duration-300'
            onClick={handleNewQuestion}
          >
            New Question
          </button>
        </div>
        <form className='flex flex-col mt-3 gap-1.5'>
          {form.questions.map((question, index) => (
            <InputQuestion
              handleChangeElement={handleChangeElement}
              // handleDeleteQuestion={handleDeleteQuestion}
              index={index}
              question={question}
              key={question._id}
            />
          ))}

          <button
            type='submit'
            className='mt-8 w-[300px] h-[54px] text-white-A700 bg-[#3DC2EC] hover:opacity-90 rounded-xl hover:text-slate-300  hover:border-gray-700 duration-300 disabled:opacity-75'
            disabled={form.questions.length !== 0 ? false : true}
            onClick={handleSubmit}
          >
            Create form feedback
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateFormFeedBack
