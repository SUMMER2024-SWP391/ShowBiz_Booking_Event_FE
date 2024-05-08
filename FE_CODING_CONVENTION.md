# FE_CODING_CONVENTION.md

> **IMPORTANT**:
> Code to be Maintain later
> Variable, File, Folder **MUST NOT** contain `'s'`
> Whole `src` **MUST NOT** exist the hyphen `-`

```
good: user, product, ...
or: userArray, userList, userCollection, ... (the return data types)

bad: users, products, ...
bad: customer-report
```

- Use [Eslint Typescript](https://typescript-eslint.io/getting-started/) format suggestion
- Use [Prettier](https://prettier.io/docs/en/#docsNav)
- Use [Husky](https://typicode.github.io/husky/how-to.html)

- File and Component names need to be identical.

```
good: folder: Header, file: Header.tsx
bads: header, headerComponent, header-component
```

- Export to ES6

# Export Component

- Export components at end of file

- Bad

```ts
// Filename: userlogin.ts
export const UserLoginNew = () => {}
```

- Good

```ts
// Filename: UserLogin.tsx
const UserLogin = () => {}
export default UserLogin
```

# Folder Name

- Use `PascalCase`
- Must not begin with a digit
- Must not contain special characters

```
good: LoginSideBar, LoginHeader
bad: user, Login-Header, Login_Header
```

# File Name or Component Name

- Use `PascalCase`
- Must not begin with a digit
- Must not contain special characters
- Good

```ts
PageHeader.tsx, UserLoginForm.tsx
```

- Bad

```ts
page - header.tsx, user - login - form.tsx
```

# Tag Class Name

- Use `kebab-case`
- Must not begin with a digit
- Must not contain special characters

```ts
render() {
  return <span className="menu navigation-menu">Menu</span>
}
```

# Handler Method

- Naming: `"handle" + TriggerEvent`.
  - exp: handleClick

> IMPORTANT: Use arrow function for 'this' to be in correct context

# Component Prop Name

- Use `camelCase`
- Must not begin with a digit
- Must not contain special characters

- Good

```ts
<UserLogin userName="John Doe" />
```

- Bad

```ts
<UserLogin user_name="John Doe" />
```

# Tags

- Alway use `/>` close tag if don't have children

- Good

```html
<Foo className="stuff" /> // only have />
```

- Bad

```html
<Foo className="stuff"></Foo> //this have </Foo>
```

- If component have many prop, put `/>` close tag on the **new line**

- Good

```html
<Foo className="stuff" id="uniqueId" dataAttribute="moreStuff" />
```

- Bad

```html
<Foo className="stuff" id="uniqueId" dataAttribute="moreStuff" />
```

# Type or Interface

- Use `PascalCase`

```ts
// demo Type
export type UserType = {
  userId: string
  userName: string
}
```

```ts
// demo Interface
export interface User {
  userId: string
  userName: string
}
```

```ts
// demo REACT
interface UseUserLoginProps {
	username: string
	password:string
}

interface UseUserLoginReturn {
  status: HTTP_STATUS
  data: gì đó
}

const useUserLogin = ({username, password}: UseUserLoginProps): UseUserLoginReturn => {
    return axios.post(xxx) // ví dụ
}
```

# Enum Name

- Use `UPPER_CASE`

```ts
export enum USER_ROLE {
  ADMIN,
  STAFF,
  STUDENT
}
```

# Should use arrow function than function declaration

- Good

```ts
const getUser = () => {
  // logic
}
```

- Bad

```ts
function getUser() {
  // logic
}
```

# Custom hook

- Bad

```ts
const hookQueryConfig = () => {
  //logic
}
```

- Good

```ts
const useQueryConfig = () => {
  //logic
}
```

# Function

- Use `camelCase`
- **Must start with a verb**
- Must not begin with a digit.
- Must not contain special characters
- Good:

```ts
function getUser() {}
```

- Bad

```ts
function get_user() {}
function get-user() {}
```

# Function Documentation

- **After each function update need to update the version**
- Just write full lowercase, use Upper case only for

```ts
/**
 * check if a number is a prime
 * @param {number} num - number need to check
 * @returns {Boolean} - true or false
 * @example isPrime(5)
 * @description
 * this function check whether a number is a prime number. return false if the input is not a integer
 * @author hoangnn
 * @version 0.0.1
 */
function isPrime(num: number): Boolean {
  // Logic
  // ...
}
```

# Import

- Import theo thứ tự: utils, styles, fonts, contexts, hooks, components, pages

```ts
//utils
import { lazy, Suspense, useEffect, useRef } from 'react'
//styles
import '@styles/index.scss'
import ThemeStyles from '@styles/theme'
//contexts
import { SidebarProvider } from '@contexts/sidebarContext'
import { ThemeProvider } from 'styled-components'
//hooks
import { ThemeContextType, useTheme } from '@contexts/themeContext
import { Route, Routes, useLocation } from 'react-router-dom'
import { useWindowSize } from 'react-use'
//conponents
import Loader from '@components/Loader'
import AppBar from '@layout/AppBar'
import { ToastContainer } from 'react-toastify'
//pages
const Login = lazy(() => import('@pages/Login'))
```

# Interact between FE and BE

> JSON property must follow the **snake_case** to distinguish it from Class properties

- Good

```json
{
  "entity_property": "value"
}
```

- Bad

```json
{
  "entityProperty": "value"
}
```

- Exp

```json
{
  "status": 200,
  "message": "success",
  "data": {
    "user_id": "123",
    "user_name": "John Doe"
  }
}
```

# Variables

- Variable names can contain alphabets and numeric digits.
- They cannot contain spaces and special characters, except the underscore (\_) and the dollar ($) sign.
- Variable names cannot begin with a digit.

- Good

```js
const userName = 'JohnDoe'
```

- Bad

```js
const 1_userName = "JohnDoe";
```

# Exception
