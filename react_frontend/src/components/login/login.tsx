import React, { useState} from 'react'
import CreateAccountForm from './createAccountForm/createAccountForm'
import LoginForm from './loginForm/loginFormat'
import './login.css'

export enum FormState {
    Login,
    CreateAccount
}

function Login() {

    const [formState, setFormState] = useState(FormState.Login)

    if(formState === FormState.Login) {
        return (
            <div className='login-container'>
                <LoginForm setFormState={setFormState}/>
            </div>
        )
    } else {
        return (
            <div className='login-container'>
                <CreateAccountForm setFormState={setFormState}/>
            </div>
        )
    } 
}

export default Login