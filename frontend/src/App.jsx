import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, Calendar, Register, Lists } from './pages'
import { ProtectedRoute } from './components/ProtectedRoute'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/calendar'
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path='/lists'
          element={
            <ProtectedRoute>
              <Lists />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
