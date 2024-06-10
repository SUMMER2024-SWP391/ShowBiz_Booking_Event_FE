export function checkPasswordStrong(input: string): boolean {
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/g
  const uppercaseRegex = /[A-Z]/g
  const numberRegex = /[0-9]/g

  return (
    symbolRegex.test(input) &&
    uppercaseRegex.test(input) &&
    numberRegex.test(input)
  )
}
