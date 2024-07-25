import { useQuery } from '@tanstack/react-query'
import exp from 'constants'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import UpdateFormFeedback from './UpdateFormFeedBack'
import CreateFormFeedBack from './CreateFormFeedBack'
import { Button, Modal } from 'antd'

const FormFeedback = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['form_feedback'],
    queryFn: () => eventApi.getFormFeedback(id as string)
  })
  const [open, setOpen] = useState(false)
  const ListQuestion = data?.data.data.formQuestion
  console.log(ListQuestion)
  return (
    <div className='mt-10'>
      <div>
        {ListQuestion && ListQuestion.length > 0 ? (
          <UpdateFormFeedback
            renderProps={
              <>
                <div className='border px-4 py-2 rounded-lg shadow-md'>
                  <button onClick={() => setOpen(true)}>Create Form FeedBack</button>
                  <Modal title='Add New Question' footer centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
                    <CreateFormFeedBack isHaveForm={true} />
                  </Modal>
                </div>
              </>
            }
          />
        ) : (
          <CreateFormFeedBack isHaveForm={true} />
        )}
      </div>
    </div>
  )
}
export default FormFeedback
