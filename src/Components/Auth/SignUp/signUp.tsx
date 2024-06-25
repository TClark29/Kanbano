import {createNewUser} from '../../../../supabase/SupabaseCalls/auth'
import { useState } from "react"

function SignUp(props){

    const setNewUser = props.setNewUser

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const [errors, setErrors] = useState({})

    function newUserChange(e){
        e.preventDefault()
        setNewUser(false)
    }

    function firstNameHandler(e){
        setFirstName(e.target.value)

    }

    function lastNameHandler(e){
        setLastName(e.target.value)
    }

    function emailHandler(e){
        setEmail(e.target.value)
    }

    function passwordHandler(e){
        setPassword(e.target.value)
    }

    function confirmPasswordHandler(e){
        setConfirmPassword(e.target.value)
    }

    function submitHandler(e){
        
        e.preventDefault()
        setLoading(true)
        setErrors({})
        const tempErrors = {}
        if (firstName.length < 1){
            tempErrors.firstName = 'Required field'

        }
        if (lastName.length < 1){
            tempErrors.lastName = 'Required field'

        }
        if (email.length < 1){
            tempErrors.email = 'Required field'

        }
       
        
        if (password.length < 6){
            tempErrors.password = 'Password must be at least 6 characters'

        }
        if (email.length < 1){
            tempErrors.password = 'Required field'

        }

        if (confirmPassword!==password){
            tempErrors.confirmPassword = 'Must match password'

        }

        setErrors(tempErrors)

        if (Object.keys(tempErrors).length===0){
            
            return createNewUser(email, password, firstName, lastName)
            .then((response)=>{
                if(response.error){
                    console.log(response.error)
                }
            })
        }



        

        console.log(tempErrors)

    }

    return (
        <>
        <h1>Sign up</h1>

        <form onSubmit={(e)=>submitHandler(e)}>
            <div>
                <label>First Name</label>
                <input value={firstName} onChange={(e)=>firstNameHandler(e)}></input>
                <ErrorText errorMessage={errors.firstName}></ErrorText>
            </div>
            <div>
                <label>Surname</label>
                <input value={lastName} onChange={(e)=>lastNameHandler(e)}></input>
                <ErrorText errorMessage={errors.lastName}></ErrorText>
            </div>
            <div>
                <label>Email</label>
                <input value={email} onChange={(e)=>emailHandler(e)}></input>
                <ErrorText errorMessage={errors.email}></ErrorText>
            </div>
            <div>
                <label>Password</label>
                <input value={password} onChange={(e)=>passwordHandler(e)} type="password"></input>
                <ErrorText errorMessage={errors.password}></ErrorText>
            </div>
            <div>
                <label>Confirm Password</label>
                <input value={confirmPassword} onChange={(e)=>confirmPasswordHandler(e)} type="password"></input>
                <ErrorText errorMessage={errors.confirmPassword}></ErrorText>
            </div>
            <button onClick={(e)=>submitHandler(e)}>Sign Up</button>
        </form>
        <button onClick={(e)=>newUserChange(e)}>Already have an account?</button>
        </>
    )
}

function ErrorText(props){

    const errorMessage = props.errorMessage

    return (
        <div>{errorMessage}</div>
    )
}

export default SignUp