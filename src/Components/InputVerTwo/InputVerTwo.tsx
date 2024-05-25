import { InputHTMLAttributes } from 'react'
import { RegisterOptions, type UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

const InputVerTwo = ({
  type,
  errorMessage,
  name,
  placeholder,
  className = 'w-full',
  register,
  rules,
  autoComplete,
  classNameInput = 'rounded-[10px] border border-solid border-white-A700 font-bold sm:pr-5 w-full',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-rose-300 font-bold'
}: InputProps): JSX.Element => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        autoComplete={autoComplete}
        className={classNameInput}
        placeholder={placeholder}
        {...registerResult} //react hook form tự override lại name của tag input do khi chạy register
        //nó sẽ trả và 1 field name tương tự
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default InputVerTwo
