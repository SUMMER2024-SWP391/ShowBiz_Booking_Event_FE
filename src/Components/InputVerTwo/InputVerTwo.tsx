import { InputHTMLAttributes } from 'react'
import { RegisterOptions, type UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
  renderProps?: React.ReactNode
  defaultValue?: string
  disabled?: boolean

  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

const InputVerTwo = ({
  type,
  errorMessage,
  name,
  placeholder,
  className = '',
  register,
  rules,
  autoComplete,
  classNameInput = 'rounded-[10px] h-[35px] px-3 border border-solid   sm:pr-5 w-full',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red',
  renderProps,
  defaultValue,
  disabled,
  // onChange
}: InputProps): JSX.Element => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      {renderProps}
      <input
        disabled={disabled}
        type={type}
        value={defaultValue}
        autoComplete={autoComplete}
        className={`${classNameInput} ' border border-solid hover:border-black_dark sm:pr-5 w-full'`}
        placeholder={placeholder}
        
        {...registerResult} //react hook form tự override lại name của tag input do khi chạy register
        //nó sẽ trả và 1 field name tương tự
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default InputVerTwo
