import { useState } from "react"
import { signInUser } from "../../../../supabase/SupabaseCalls/auth"


function SignIn(props){

    const setNewUser = props.setNewUser
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function newUserChange(e){
        e.preventDefault()
        setNewUser(true)
    }

    function signIn(e){
        e.preventDefault()
        signInUser(email, password)




    }

    return (
        <>
        <h1>Sign in</h1>
        <form onSubmit={(e)=>signIn(e)}>
            <div>
                <label>email</label>
                <input></input>
            </div>
            <div>
                <label>password</label>
                <input></input>
            </div>
            <button onClick={(e)=>signIn(e)}>Sign In</button>


        </form>
        <button onClick={(e)=>newUserChange(e)}>Create new account</button>
        
        </>
    )
}

export default SignIn