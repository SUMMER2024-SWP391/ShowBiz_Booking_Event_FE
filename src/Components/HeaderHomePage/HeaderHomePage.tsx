import { createSearchParams, Link, useNavigate } from 'react-router-dom'

import { Heading } from '../Heading/Heading'
import { SearchOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { AppContext } from 'src/context/app.context'
import { useContext, useState } from 'react'
import path from 'src/constants/path'
import { getRefreshTokenFromLS } from 'src/utils/auth'
import { UserRole } from 'src/@types/enum'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import HeaderEO from '../HeaderEventOperator'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import HeaderVistor from '../HeaderVistor'
import ModalPopup from '../ModalPopup/ModalPopup'
import eventApi from 'src/apis/event.api'
import { useForm } from 'react-hook-form'
import { SearchEventSchema, searchEventSchemaYup } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

interface Props {
  className?: string
  name?: string
  _id?: string
}

type SearchForm = SearchEventSchema

export default function Header({ ...props }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    setIsAuthenticated,
    isAuthenticated,
    setProfile,
    profile,
    setIsStaff
  } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: (refresh_token: string) => authAPI.logout({ refresh_token }),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      setIsStaff(false)
    },
    onError: () => {
      // console.log(error)
    }
  })

  const { register, handleSubmit } = useForm<SearchForm>({
    resolver: yupResolver(searchEventSchemaYup)
  })

  const searchEvent = useMutation({
    mutationFn: (keyword: string) => eventApi.getEventByKeyWord(keyword)
  })

  const onSubmit = handleSubmit((data) => {
    const keyword = data.keyword
    searchEvent.mutate(keyword, {
      onSuccess: (data) => {
        if (data.data.data.events.length == 0) {
          toast.error('Not found events')
          return
        }
        navigate({
          pathname: '/search',
          search: createSearchParams({
            keyword: keyword
          }).toString()
        })
      }
    })
  })

  const handleLogout = () => {
    const refresh_token = getRefreshTokenFromLS()
    logoutMutation.mutate(refresh_token)
    navigate('/')
  }

  return (
    <div className='w-full flex flex-col '>
      <div className='bg-gradient_header h-[150px] fixed z-[1] w-full opacity-[1]'></div>
      <div
        {...props}
        className={`${props.className} w-full relative z-[100]  flex flex-row justify-around items-center md:w-full `}
      >
        <Heading as='h1' size='2xl' className=''>
          eventbok.
        </Heading>

        <div className='w-[500px] flex justify-center'>
          <ul className='w-full flex justify-around'>
            {isAuthenticated && profile?.role == UserRole.Admin ? (
              <HeaderAdmin />
            ) : isAuthenticated && profile?.role == UserRole.EventOperator ? (
              <HeaderEO />
            ) : (
              <HeaderVistor />
            )}
          </ul>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <button onClick={() => setOpen(true)}>
            <SearchOutlined className=' h-[30px] w-[30px]' />
          </button>
          <ModalPopup
            key={new Date().toISOString()}
            type='search'
            open={open}
            onClose={() => setOpen(false)}
            children={
              <form className='flex justify-center' onSubmit={onSubmit}>
                <input
                  type='text'
                  className='text-black-900 outline-none rounded-lg w-[300px] h-[40px] border border-black-900 pl-2'
                  {...register('keyword')}
                />
                <button className='ml-2'>
                  <SearchOutlined className='!text-black-900 h-[30px] w-[30px]' />
                </button>
              </form>
            }
          />
          {!isAuthenticated ? (
            <Link to={path.login} className='w-20 h-8 '>
              <div className='border border-solid border-black-900 rounded-lg text-center font-euclid font-bold'>
                Log In
              </div>
            </Link>
          ) : (
            <AvatarProfile onClick={handleLogout} />
          )}
        </div>
      </div>
    </div>
  )
}
