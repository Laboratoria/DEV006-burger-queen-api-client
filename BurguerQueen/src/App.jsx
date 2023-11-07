import './App.css'
// import {Logo} from './Components/Home/logo'
// import { ButtonWaiter } from './Components/Home/ButtonWaiter'
// import { ButtonKitchen } from './Components/Home/ButtonKitchen'
// import { ButtonAdmin } from './Components/Home/ButtonAdmin'
// import 'tailwindcss/tailwind.css'
import {Home} from './Components/Home/Home'
import {Form} from './Components/Login/Form'
import { WaiterViewBreakfast } from './Components/Waiter/WaiterViewBreakfast';
import{AdminView} from './Components/Admin/AdminView';
import{KitchenView} from './Components/Kitchen/KitchenView'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

function App() {

  return (
    <Router>
    <>
       <Routes>
        <Route path='/Login' Component={Form} /> 
        <Route path='/KitchenView' Component={KitchenView} />
        <Route path='/WaiterViewBreakfast' Component={WaiterViewBreakfast} />
         <Route path='/AdminView' Component={AdminView} />
        <Route path='/' Component={Home} />
       
       </Routes>
       </>
    </Router>
  )
} 

export default App
