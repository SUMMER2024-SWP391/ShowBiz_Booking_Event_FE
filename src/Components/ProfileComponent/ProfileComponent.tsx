import { User } from 'src/@types/users.type'
import InputVerTwo from '../InputVerTwo/InputVerTwo'

export type UserProfile = {
  user: Pick<
    User,
    '_id' | 'email' | 'user_name' | 'phone_number' | 'date_of_birth' | 'point'
  >
}

const ProfileComponent = ({ user }: UserProfile) => {
  const birthdate = user.date_of_birth?.split('T')[0]
  return (
    <div className='grid grid-cols-2 gap-8'>
      <InputVerTwo
        disabled={true}
        defaultValue={user.user_name}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Name</div>}
      />
      <InputVerTwo
        disabled={true}
        defaultValue={user.email}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Email</div>}
      />
      <InputVerTwo
        disabled={true}
        className='basis-2'
        defaultValue={user.phone_number}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Phone number</div>}
      />
      <InputVerTwo
        disabled={true}
        defaultValue={birthdate as string}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Birthdate</div>}
      />
      <InputVerTwo
        disabled={true}
        defaultValue={user.point}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Point</div>}
      />
    </div>
  )
}

export default ProfileComponent
