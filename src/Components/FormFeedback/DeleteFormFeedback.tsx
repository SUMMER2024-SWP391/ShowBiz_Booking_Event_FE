import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { formAPI } from 'src/apis/form.api'

const DeleteFormFeedback = () => {
  const queryClient = useQueryClient()
  const deleteQuestion = useMutation({
    mutationFn: (id: string) => formAPI.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'], exact: true })
      toast.success('Delete question success')
    }
  })
  return (
    <div>DeleteFormFeedback</div>
  )
}

export default DeleteFormFeedback