import React, { useState} from 'react'
import user from '../../../redux/user'
import { FormState } from '../login'
import './createAccountForm.css'

function CreateAccountForm(props:any) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    function handleSubmit(e:any) {
      e.preventDefault()
      console.log(`Email: ${email}\nPassword: ${password}`)
  
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)
      
      fetch('http://localhost:5000/api/user/create', {
        method: 'POST',
        // Convert the react state to JSON and send
        body: data
      }).then((res) => res.json())
      .then(data => {
        console.log(data)
        if (data.error === undefined && data.user !== undefined) {
          props.setFormState(FormState.Login)
        }
      })
    }
  
  return (
    <form id='create-account-form' name='create-account-form' onSubmit={e => handleSubmit(e)}>
        <h2>Create Account</h2>
        <input
         placeholder='Email'
         value={email} 
         type='email' 
         required 
         onChange={(e:any) => setEmail(e.target.value)}
         />
        <input 
         placeholder='Password'
         value={password}
         type='password' 
         required 
         onChange={(e:any) => setPassword(e.target.value)}></input>
        <button type='submit'>Submit</button>
        <button onClick={() => props.setFormState(FormState.Login)}>Login</button>
    </form>
  )
}

export default CreateAccountForm