"use client"

import * as React from "react"
import {useState} from "react"
import apiClient from "../api/apiClient"
import  { useAuthContext } from "../context/auth"
import Button from '../components/Button'

export default function Login() {
  const { user, setUser }: any = useAuthContext()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmit,setIsSubmit]=useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
      username: "",
      password: "",
    })

    const handleSubmit = async (event: any) => {
      event.preventDefault()
      setIsLoading(true)
     
      setErrors((error) => ({ ...error, form: null }))

      const {data, error} = await apiClient.loginUser({ username: loginForm.username, password:loginForm.password})
      if(error) setErrors((e) => ({ ...e, form: error}))
      if(data?.user) {
        setUser(data.user)
        apiClient.setToken(data.token)
      }
      setIsSubmit(true)
      setIsLoading(false)

    }
  
    const handleClick = () => setShowPassword(!showPassword)

    const handleChange = (event: any) => {
        if (event.target.name === "username") {
            if (event.target.value.length <= 4) {
              setErrors((error) => ({ ...error, username: "Please enter a valid username." }))
            } else {
              setErrors((error) => ({ ...error, username: null }))
            }
          }
        setLoginForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Log In</h1>
        <form id='form' onSubmit={handleSubmit} method="post">
        <div className='form-fields'>
          <div className='form-username'>
            <label>Username</label>
            <input type='text' name='username' onChange={handleChange}></input>
          </div>
          <div className='form-password'>
            <label>Password</label>
            <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange}></input>
            <button onClick={handleClick}>Show password</button>
          </div>
          <button type='submit'><span className='btn-text'>Submit</span></button>
        </div>
      </form>
    </main>
  )
}
