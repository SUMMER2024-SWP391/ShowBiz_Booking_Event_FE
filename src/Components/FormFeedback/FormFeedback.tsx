import { useQuery } from '@tanstack/react-query'
import exp from 'constants'
import React from 'react'
import { useParams } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import UpdateFormFeedback from './UpdateFormFeedBack'
import CreateFormFeedBack from './CreateFormFeedBack'

const FormFeedback = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['form_feedback_update'],
    queryFn: () => eventApi.getFormFeedback(id as string)
  })
  const ListQuestion = data?.data.data.formQuestion
  console.log(ListQuestion)
  return (
    <div>
      <h1>Form Feedback</h1>
      <div>
        {ListQuestion && ListQuestion.length > 0 ? <UpdateFormFeedback renderProps={<CreateFormFeedBack/>}/> : <CreateFormFeedBack />}
      </div>
    </div>
    
  )
}
export default FormFeedback