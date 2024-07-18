import { EventQuestionType } from 'src/@types/form.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

export const formAPI = {
  createForm: (
    id: string,
    body: { questions: string[]; type: EventQuestionType }
  ) => http.post<{}>(`/forms/new/${id}`, body),

  updateForm: (
    id: string,
    body: {
      questions: Array<{ _id: string; description: string }>
      type: EventQuestionType
    }
  ) => http.post<{}>(`/forms/update/${id as string}`, body),

  addNewQuestion: (
    id: string,
    body: { questions: Array<string>; type: EventQuestionType }
  ) =>
    http.post<SuccessResponse<{}>>(
      `forms/question/update/feed-back/${id}`,
      body
    ),
  deleteQuestion: (id: string) =>
    http.delete<SuccessResponse<null>>(`forms/question/delete/feed-back/${id}`),
  checkFormFeedbackIsExist: (id: string) =>
    http.get<
      SuccessResponse<{
        formFeedBack?: {
          _id: string
          event_id: string
          type: EventQuestionType
        }
      }>
    >(`forms/handle/check/has-form-feedback/${id}`)
}
