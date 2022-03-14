import React, { useState} from 'react'
import { FormState } from '../login'
import './loginForm.css'
import { useDispatch } from "react-redux"
import { login } from "../../../redux/user"

function LoginForm(props:any) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    function handleSubmit(e:any) {
      e.preventDefault()
      console.log(`Email: ${email}\nPassword: ${password}`)
  
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)

      fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        // Convert the react state to JSON and send
        body: data
      }).then((res) => res.json())
      .then(data => {
        console.log(data)
        if (data.error !== undefined) {
          return
        }
        dispatch(login({loggedIn:1, user:data.user, token:data.token}))
      }).catch(err => {
        console.log(err)
      })
    }
  
  return (
    <form id='login-form' name='login-form' onSubmit={e => handleSubmit(e)}>
        <h2>Login</h2>
        <input 
         placeholder='Email'
         value={email}
         type='email'
         required onChange={(e:any) => setEmail(e.target.value)} 
         />
        <input 
         placeholder='Password'
         value={password}
         type='password' 
         required 
         onChange={(e:any) => setPassword(e.target.value)} 
         />
        <button type='submit'>Submit</button>
        <button onClick={() => props.setFormState(FormState.CreateAccount)}>Create Account</button>
    </form>
  )
}

export default LoginForm