import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { EventQuestionType } from 'src/@types/form.type'
import { ReactNode, useEffect, useState } from 'react'
import InputUpdate from '../InputUpdate/InputUpdate'
import { formAPI } from 'src/apis/form.api'
import { toast } from 'react-toastify'

type Question = {
  _id: string
  description: string
  messageError: string
}
type Props = {
  renderProps?: ReactNode
}
const UpdateFormFeedback = ({ renderProps }: Props) => {
  const [form, setForm] = useState<Array<Question>>([])
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['form_feedback_update'],
    queryFn: () => eventApi.getFormFeedback(id as string)
  })
  const queryClient = useQueryClient()
  const deleteQuestion = useMutation({
    mutationFn: (id: string) => formAPI.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form_feedback'], exact: true })
      toast.success('Delete question success')
    }
  })
  const updateFormEventFeedBackMutation = useMutation({
    mutationFn: (body: {
      id?: string
      body: {
        questions: Array<{ _id: string; description: string }>
        type: EventQuestionType
      }
    }) => formAPI.updateForm(body.id as string, body.body)
  })

  useEffect(() => {
    if (data?.data.data.formQuestion) {
      const { formQuestion } = data.data.data
      formQuestion.map((question) => ({ ...question, messageError: '' }))
      setForm(formQuestion as Array<Question>)
    }
  }, [data?.data.data.formQuestion])
  const handleDeleteQuestion = (id: string) => {
    deleteQuestion.mutate(id as string)
  }
  const handleChangeElement = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setForm((prevForm) =>
      prevForm.map((question) => {
        if (question._id === id) {
          return { ...question, description: value }
        }
        return question
      })
    )
  }

  const handleValidateQuestion = (): {
    listQuestionError: Array<Question>
    count: number
  } => {
    const listQuestionError = form
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
      setForm(result.listQuestionError)
      return
    }

    const questions: Array<{ _id: string; description: string }> = []
    for (let index = 0; index < form.length; index++) {
      questions.push({
        _id: form[index]._id,
        description: form[index].description
      })
    }

    updateFormEventFeedBackMutation.mutate(
      {
        id,
        body: {
          questions,
          type: EventQuestionType.FEEDBACK
        }
      },
      {
        onSuccess: () => {
          toast.success('Update form feedback event sucessfully')
        }
      }
    )
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center w-[95%]'>
        <form className='flex flex-col'>
          {data &&
            form.length !== 0 &&
            form.map((question, index) => (
              <>
                <div className='flex flex-row gap-5 mt-5'>
                  <InputUpdate index={index} question={question} key={question._id} handleChangeElement={handleChangeElement} />
                  <button
                    className=' h-[54px] w-[60px] text-white-A700 bg-red rounded-xl opacity-90 hover:opacity-100 hover:text-slate-50 hover:border-2 hover:border-[#42C2FF] duration-300'
                    type='button'
                    onClick={() => handleDeleteQuestion(question._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ))}
          <div className='flex flex-row justify-center'>
            <button
              className='mt-8 h-[54px] w-[200px]  text-white-A700 bg-[#34B3F1] rounded-xl opacity-90 hover:opacity-100 hover:text-slate-50 hover:border-2 hover:border-[#42C2FF] duration-300'
              type='button'
              onClick={handleSubmit}
            >
              Update question
            </button>
          </div>
        </form>
        <div className='mt-3'>{renderProps}</div>
      </div>
    </>
  )
}

export default UpdateFormFeedback
