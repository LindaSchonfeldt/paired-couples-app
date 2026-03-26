import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, Calendar, Register, Lists } from './pages'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/lists' element={<Lists />} />
      </Routes>
    </BrowserRouter>
  )
}
