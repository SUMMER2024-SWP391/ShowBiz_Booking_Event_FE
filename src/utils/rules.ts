import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { checkPasswordStrong } from './handleRegex'
type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'date_of_birth'
    | 'user_name'
    | 'phone_number'
    | 'confirm_password']?: RegisterOptions
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
      },
      validate:
        typeof checkPasswordStrong === 'function'
          ? (value) =>
              checkPasswordStrong(value) ||
              'Password must has one symbol, one Uppercase, one number'
          : undefined
    },
    confirm_password: {
      required: { value: true, message: 'Confirm password is required' },
      minLength: {
        value: 8,
        message: 'Password must be as least 8 characters'
      },
      validate:
        typeof getValues === 'function'
          ? (value) =>
              value === getValues('password') || 'Password nhập lại không đúng'
          : undefined
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
    user_name: {
      required: 'This field is required'
    },
    phone_number: {
      required: 'This field is required',
      pattern: {
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: 'Invalid phone number'
      }
    }
  }
}

export const LoginSchemaYup = yup.object().shape({
  email: yup.string().email('Invalid email').required('This field is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('This field is required')
})

export type LoginSchema = yup.InferType<typeof LoginSchemaYup>

export const CreateEventOperatorSchemaYup = yup.object().shape({
  user_name: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  phone_number: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number')
    .required('This field is required'),
  date_of_birth: yup
    .date()
    .required('This field is required')
    .max(new Date(), 'Date of birth must be less than current date')
})

export type CreateEventOperatorSchema = yup.InferType<
  typeof CreateEventOperatorSchemaYup
>

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
