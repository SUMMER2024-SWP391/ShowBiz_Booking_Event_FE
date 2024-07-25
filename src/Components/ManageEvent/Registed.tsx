import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'

import { Table, TableColumnsType, Tag } from 'antd'
import { StatusRegisterEvent } from 'src/@types/utils.type'
import { Heading } from '../Heading/Heading'
import { useState } from 'react'

interface Props {
  id: string
}

const columns: TableColumnsType<{
  _id: string
  status_register: StatusRegisterEvent
  user_name: string
}> = [
  {
    title: 'User name',
    dataIndex: 'user_name'
  },
  {
    title: 'Status register',
    dataIndex: 'status_register',
    render: (status_register) =>
      status_register == StatusRegisterEvent.SUCCESS ? <Tag color='success'>{status_register}</Tag> : <Tag color='error'>{status_register}</Tag>
  }
]
export const Registed = ({ id }: Props) => {
  const { data } = useQuery({
    queryKey: ['list-registed-event'],
    queryFn: () => eventApi.getListUserRegistedEvent(id)
  })

  return (
    <>
      <div className='mt-5 flex flex-col justify-center '>
        <Heading as='h6' size='md' className='flex items-start !font-monterat !text-[20px]'>
          Guest List
        </Heading>
        <div className='mt-10'>{data && <Table dataSource={data.data.data} columns={columns} pagination={false} className='rounded-lg' />}</div>
      </div>
    </>
  )
}
