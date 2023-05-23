"use client"

import * as React from "react"
import { useState } from "react"
import apiClient from "../api/apiClient"
import  { useAuthContext } from "../context/auth"
import Button from '../components/Button'

export default function SignUp() {
    const { user, setUser }: any = useAuthContext()
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmit,setIsSubmit]=useState(false)
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: ""
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        setErrors((error) => ({ ...error, form: null }))
    
        if (registerForm.passwordConfirm !== registerForm.password) {
          setErrors((error) => ({ ...error, passwordConfirm: "Passwords do not match." }))
          setIsLoading(false)
          return
        } else {
          setErrors((error) => ({ ...error, passwordConfirm: null }))
        }
  
        const {data, error} = await apiClient.signupUser({ username: registerForm.username.toLowerCase(), password: registerForm.password, 
                                                            firstName: registerForm.firstName, lastName: registerForm.lastName })
        if(error) setErrors((e) => ({ ...e, form: error}))
        
        if(data?.user) {
          
          setUser(data.user)
          apiClient.setToken(data.token)
        }
  
        setIsSubmit(true)
        setIsLoading(false)

      }

    const handleClick = () => setShowPassword(!showPassword)
    const handleClicks = () => setShowPasswordConfirm(!showPasswordConfirm)
    const handleChange = (event: any) => {
        if (event.target.name === "username") {
            if (event.target.value.length <= 4) {
                setErrors((error) => ({ ...error, username: "Please enter a valid username." }))
            } else {
                setErrors((error) => ({ ...error, email: null }))
            }
        }
        setRegisterForm((form) => ({ ...form, [event.target.name]: event.target.value }))
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
        <h1>Sign Up</h1>
          <form id='form' onSubmit={handleSubmit} method="post">
          <div className='form-fields'>
            <div className='form-username'>
              <label>Username</label>
              <input type='text' name='username' onChange={handleChange}></input>
            </div>
            <div className='form-firstname'>
              <label>First Name</label>
              <input type='text' name='firstName' onChange={handleChange}></input>
            </div>
            <div className='form-lastname'>
              <label>Last Name</label>
              <input type='text' name='lastName' onChange={handleChange}></input>
            </div>
            <div className='form-password'>
              <label>Password</label>
              <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange}></input>
              <button onClick={handleClick}>Show password</button>
            </div>
            <div className='form-password'>
              <label>Confirm Password</label>
              <input type={showPasswordConfirm ? 'text' : 'password'} name='passwordConfirm' onChange={handleChange}></input>
              <button onClick={handleClicks}>Show password</button>
            </div>
            <button type='submit'><span className='btn-text'>Submit</span></button>
          </div>
        </form>
      </main>
    )
  }
  