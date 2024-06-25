import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import SignIn from "./SignIn/signIn"
import SignUp from "./SignUp/signUp"

function Auth () {

    const { user, session } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (user){
            navigate('/')
        }
    },[user])

    


    const [newUser, setNewUser] = useState<boolean>(false)

    return (
        <>
        {newUser && <SignUp setNewUser={setNewUser}></SignUp>}
        {!newUser &&<SignIn setNewUser={setNewUser}></SignIn>}
        </>
    )
}

export default Auth