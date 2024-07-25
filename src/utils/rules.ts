import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'date_of_birth'
    | 'user_name'
    | 'phone_number'
    | 'confirm_password'
    | 'old_password'
    | 'capacity'
    | 'date_event'
    | 'image'
    | 'name'
    | 'ticket_price'
    | 'time_end'
    | 'time_start'
    | 'location'
    | 'description'
    | 'speaker_name'
    | 'sponsor_name'
    | 'type_event'
    | 'otp_check_in'
    | 'user_name'
    | 'mssv']?: RegisterOptions
}
export const getRulesLogin = (getValues?: UseFormGetValues<any>): Rules => {
  return {
    email: {
      required: 'This field is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Invalid email'
      }
    },
    password: {
      required: 'This field is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 6 characters'
      }
    },
    confirm_password: {
      required: { value: true, message: 'Confirm password is required' },
      minLength: {
        value: 8,
        message: 'Password must be as least 8 characters'
      },
      validate: typeof getValues === 'function' ? (value) => value === getValues('password') || 'Password nhập lại không đúng' : undefined
    },
    date_of_birth: {
      required: 'This field is required',
      validate: (value) => {
        const date = new Date(value)
        const now = new Date()
        if (date > now) {
          return 'Date of birth must be less than current date'
        }
        return true
      }
    },
    phone_number: {
      required: 'This field is required',
      pattern: {
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: 'Invalid phone number'
      }
    },
    old_password: {
      required: 'This field is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 6 characters'
      }
    },
    capacity: {
      required: 'This field is required'
    },
    date_event: {
      required: 'This field is required'
    },
    image: {
      required: 'This field is required'
    },
    name: {
      required: 'This field is required'
    },
    ticket_price: {
      required: 'This field is required'
    },
    time_end: {
      required: 'This field is required'
    },
    time_start: {
      required: 'This field is required'
    },
    location: {
      required: 'This field is required'
    },
    description: {
      required: 'This field is required'
    },
    speaker_name: {
      required: 'This field is required'
    },
    sponsor_name: {
      required: 'This field is required'
    },
    type_event: {
      required: 'This field is required'
    },
    otp_check_in: {
      required: 'Otp check in is required'
    },
    user_name: {
      required: 'User name is required'
    },
    mssv: {
      required: 'MSSV is required',
      pattern: {
        value: /[A-Z]{2}\d{6}/,
        message: 'Invalid MSSV'
      }
    }
  }
}

export const LoginSchemaYup = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required!'),
  password: yup.string().required('Password is required!')
})

export type LoginSchema = yup.InferType<typeof LoginSchemaYup>

export const CreateEventOperatorSchemaYup = yup.object().shape({
  user_name: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  phone_number: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number')
    .required('This field is required')
})

export type CreateEventOperatorSchema = yup.InferType<typeof CreateEventOperatorSchemaYup>

export const ForgotPasswordSchemaYup = yup.object().shape({
  email: yup.string().email('Invalid email').required('This field is required')
})
export type ForgotPasswordSchema = yup.InferType<typeof ForgotPasswordSchemaYup>

export const ResetPasswordSchemaYub = yup.object().shape({
  password: yup.string().required('Password must be required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password must be same password')
    .required('Confirm password must be required')
})

export type ResetPasswordSchema = yup.InferType<typeof ResetPasswordSchemaYub>
export const RegisterEventSchemaYup = yup.object().shape({
  full_name: yup.string().required('This field is required'),
  phone_number: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number')
    .required('This field is required'),
  mssv: yup
    .string()
    .matches(/[A-Z]{2}\d{6}/, 'Invalid MSSV')
    .required('This field is required')
})
export type RegisterEventSchema = yup.InferType<typeof RegisterEventSchemaYup>

export const ChangePasswordSchemaYub = yup.object().shape({
  old_password: yup.string().required('Old password must be required'),
  password: yup.string().required('Password must be required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password must be same password')
    .required('Confirm password must be required')
})

export type ChangePasswordSchema = yup.InferType<typeof ChangePasswordSchemaYub>

export const CreateEventSchemaYup = yup.object().shape({
  name: yup.string().required('This field is required'),
  type_event: yup.string().required('This field is required'),
  date_event: yup.string().required('This field is required'),
  time_start: yup.string().required('This field is required'),
  time_end: yup.string().required('This field is required'),
  location: yup.string().required('This field is required'),
  capacity: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  speaker_name: yup.string().required('This field is required'),
  sponsor_name: yup.string().required('This field is required'),
  ticket_price: yup.string().required('This field is required'),
  image: yup.string().required('This field is required')
})

export type CreateEventSchema = yup.InferType<typeof CreateEventSchemaYup>

export const otpCheckInSchemaYup = yup.object().shape({
  otp_check_in: yup
    .string()
    .matches(/^.{8}$/, 'Otp must be 8 characters')
    .required('Otp is required')
})

export type OTPCheckInSchema = yup.InferType<typeof otpCheckInSchemaYup>

export const addStaffCheckingSchemaYup = yup.object().shape({
  email: yup.string().required('This field is required').email('Invalid email')
})

export type AddStaffCheckingSchema = yup.InferType<typeof addStaffCheckingSchemaYup>

export const registerSchemaYup = yup.object().shape({
  mssv: yup
    .string()
    .required('Student code is required!')
    .matches(/[A-Z]{2}\d{6}/, 'Invalid MSSV!'),
  user_name: yup.string().required('User name is required!'),
  email: yup.string().required('Email is required!').email('Invalid email!'),
  password: yup.string().required('Password is required!').min(8, 'Password must be at least 8 characters'),
  confirm_password: yup
    .string()
    .required('Confirm password is required!')
    .oneOf([yup.ref('password')], 'Confirm password must be same password!')
})

export type RegisterSchema = yup.InferType<typeof registerSchemaYup>

export const searchEventSchemaYup = yup.object().shape({
  keyword: yup.string().required('Keyword is required!')
})

export type SearchEventSchema = yup.InferType<typeof searchEventSchemaYup>

export const inviteUserSchemaYup = yup.object().shape({
  email: yup.string().required('Email is required!').email('Invalid email!'),
  user_name: yup.string().required('User name is required!')
})

export type InviteUserSchema = yup.InferType<typeof inviteUserSchemaYup>
