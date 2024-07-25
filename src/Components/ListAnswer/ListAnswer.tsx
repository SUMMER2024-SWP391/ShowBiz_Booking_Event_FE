import { useQuery } from '@tanstack/react-query'
import { Table, TableColumnsType } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { useParams } from 'react-router-dom'
import { ListQuestion } from 'src/@types/event.type'
import eventApi from 'src/apis/event.api'

let columns: TableColumnsType<any> = []

interface TransformedData {
  headers: string[]
  data: { [key: string]: string }[]
}

const tranformData = (formQuestion: ListQuestion[]): TransformedData => {
  const data: { [key: string]: string }[] = []
  const headers = formQuestion.map((q) => q.description)

  formQuestion.forEach((question) => {
    question.answer.forEach((answer) => {
      const existingRow = data.find((row) => row.user_name === answer.user_name)
      if (existingRow) {
        existingRow[question.description] = answer.description
      } else {
        const newRow: { [key: string]: string } = { user_name: answer.user_name }
        newRow[question.description] = answer.description
        data.push(newRow)
      }
    })
  })

  return { headers, data }
}

const ListAnswer = () => {
  const { id } = useParams()
  const dataAnswerFeedback = useQuery({
    queryKey: ['list-answer-feedback'],
    queryFn: () => eventApi.getFormFeedback(id as string)
  })

  let transformData = []
  if (dataAnswerFeedback.data) {
    const formQuestion = dataAnswerFeedback.data.data.data.formQuestion
    transformData = tranformData(formQuestion)

    columns = [
      {
        title: 'User name',
        dataIndex: 'user_name',
        key: 'user_name'
      },
      // Các cột còn lại dựa trên các câu hỏi
      ...transformData.headers.map((header) => ({
        title: header,
        dataIndex: header,
        key: header
      }))
    ]
  }

  return (
    <div className='container-xs'>
      {dataAnswerFeedback.data && (
        <div className='w-full'>
          <Table columns={columns} dataSource={tranformData as any} />
        </div>
      )}
    </div>
  )
}

export default ListAnswer
