import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, Calendar, Register, Lists, SpaceSetup } from './pages'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Navbar } from './components/Navbar'

// A layout component that includes the Navbar and wraps protected routes
const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <Navbar />
    {children}
  </ProtectedRoute>
)

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/setup'
          element={
            <ProtectedRoute>
              <SpaceSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
          }
        />
        <Route
          path='/calendar'
          element={
            <ProtectedLayout>
              <Calendar />
            </ProtectedLayout>
          }
        />
        <Route
          path='/lists'
          element={
            <ProtectedLayout>
              <Lists />
            </ProtectedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
