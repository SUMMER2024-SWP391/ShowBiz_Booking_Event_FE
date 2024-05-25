import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = {
  [key in 'email' | 'password']?: RegisterOptions
}
export const getRules = (getValues?: UseFormGetValues<any>): Rules => {
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
        value: 6,
        message: 'Password must be at least 6 characters'
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
