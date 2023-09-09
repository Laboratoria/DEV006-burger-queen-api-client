import { Form } from './components/Form'
import { Home } from './components/Home' 
import { useState } from 'react'
import './App.css'

function App() {

  const [user, setUser]=useState(null)

  return (
    <div className='app'>
      {
        user === null
        ?<Form setUser= {setUser}/>
        :<Home setUser= {setUser} user = {user} />
      }
      

    </div>
  )
}

export default App
