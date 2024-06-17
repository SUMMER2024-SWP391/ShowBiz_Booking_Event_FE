import { EventQuestionType } from 'src/@types/form.type'
import http from 'src/utils/http'

export const formAPI = {
  createForm: (
    id: string,
    body: { questions: string[]; type: EventQuestionType }
  ) => http.post<{}>(`/forms/new/${id}`, body)
}
