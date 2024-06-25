import supabase from '../supabase'

function createNewUser(email, password, firstName, lastName){

    return supabase.auth.signUp({email:email, password:password, options: { data:{firstName:firstName, lastName: lastName}}})
    .then((response)=>{
        return response
    })
  }

function signInUser(email, password){
    return supabase.auth.signInWithPassword({email:email, password:password})
    .then((response)=>{
        return response
    })
}



  export {createNewUser, signInUser}

  