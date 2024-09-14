
import { Route, Routes } from 'react-router-dom'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Home from './components/home/Home'
import Addclass from './components/addclass/Addclass'
import SingleClass from './components/singleclass/SingleClass'

const Layout = () => {
 
  return (
    <div>
        <Routes>
            <Route path='register' element={<Register />}/>
            <Route path='login' element={<Login />}/>
            <Route path='' element={<Home />}/>
            <Route path='/addclass' element={<Addclass />}/>
            <Route path='/:id' element={<SingleClass />}/>
        </Routes>
    </div>
  )
}

export default Layout