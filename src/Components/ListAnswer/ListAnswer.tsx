// import { useQuery } from '@tanstack/react-query'
// import { Table, TableColumnsType } from 'antd'
// import { ColumnProps } from 'antd/es/table'
// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ListQuestion } from 'src/@types/event.type'
// import eventApi from 'src/apis/event.api'

// let columns: TableColumnsType<any> = []

// interface TransformedData {
//   headers: string[]
//   data: { [key: string]: string }[]
// }

// // const TranformData = (formQuestion: ListQuestion[]): TransformedData => {
// //   const data: { [key: string]: string }[] = []
// //   const headers = formQuestion.map((q) => q.description)

// //   formQuestion.forEach((question) => {
// //     question.answer.forEach((answer) => {
// //       const existingRow = data.find((row) => row.user_name === answer.user_name)
// //       if (existingRow) {
// //         existingRow[question.description] = answer.description
// //       } else {
// //         const newRow: { [key: string]: string } = { user_name: answer.user_name }
// //         newRow[question.description] = answer.description
// //         data.push(newRow)
// //       }
// //     })
// //   })

// //   return { headers, data }
// // }

// const ListAnswer = () => {
//   const { id } = useParams()
//   // const dataAnswerFeedback = useQuery({
//   //   queryKey: ['list-answer-feedback'],
//   //   queryFn: () => eventApi.getFormFeedback(id as string)
//   // })
//   const [columns, setColumns] = useState<{title: string,
//     dataIndex: string, key: string
//   }[]>([])

//   // let transformData = []
//   useEffect(() => {
//     try {
//       const fetchApi = async () => {
//         const response = await eventApi.getFormFeedback(id as string)
//         console.log(response.data.data.formQuestion);
//         let answer1 = [];
//         const column = response.data.data.formQuestion.reduce((acc: {title: string,
//           dataIndex: string, key: string
//         }[], cur) => {
//           return [...acc, {
//             title: cur.description,
//             dataIndex: cur.description,
//             key: cur.description
//           }]
//         }, [])

//         const answer = response.data.data.formQuestion.reduce((acc: {title: string,
//           dataIndex: string, key: string
//         }[], cur) => {
//           const data = cur.answer.reduce((acc, cur1) => {
//             return [...acc, {
//               user_name: cur1.user_name,
//               description: cur1.description,
//               ans_id: cur.description
//             }]
//           }, [])
//           console.log(data)
//           answer1.push({id: data.user_name, answer: 1})
          
//           return [...acc, {
//             title: cur.description,
//             dataIndex: cur.description,
//             key: cur.description
//           }]
//         }, [])

//         setColumns(column)
//         console.log(answer1)
//       }
//       fetchApi();
//     } catch (err) {
//       console.log(err)
//     }
//   }, [])



//   // if (dataAnswerFeedback.data) {
//   //   const formQuestion = dataAnswerFeedback.data.data.data.formQuestion
//   //   // transformData = TranformData(formQuestion)
//   //   console.log(formQuestion)

//     // columns = [
//     //   {
//     //     title: 'User name',
//     //     dataIndex: 'user_name',
//     //     key: 'user_name'
//     //   },
//     //   // Các cột còn lại dựa trên các câu hỏi
//     //   ...transformData.headers.map((header) => ({
//     //     title: header,
//     //     dataIndex: header,
//     //     key: header
//     //   }))
//     // ]
  

//   // return (
//   //   <div className='container-xs'>
//   //     {dataAnswerFeedback.data && (
//   //       <div className='w-full'>
//   //         <Table columns={columns} dataSource={tranformData as any} />
//   //       </div>
//   //     )}
//   //   </div>
//   // )
// }

// export default ListAnswer
