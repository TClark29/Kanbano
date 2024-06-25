
import Board from './Components/Board/Board'
import {Routes, Route} from 'react-router-dom'

import Main from './Components/Main/Main'
import Auth from './Components/Auth/Auth'


import './App.css'
import AuthProvider from './contexts/Auth'
import { useAuth } from './contexts/Auth'

function App() {

  const {user, session} = useAuth()

 

  return (
    <>
    <AuthProvider>
    <Routes>
      
      <Route path='/login' element={<Auth></Auth>}/>
      <Route path='/*' element={<Main></Main>}/>
      <Route path='/board/:board_id' element={<Board></Board>}/>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
