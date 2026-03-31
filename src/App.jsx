import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar, ProtectedRoute } from './components'
import {
  Calendar,
  Home,
  Lists,
  Login,
  Register,
  Space,
  SpaceSetup
} from './pages'

// A layout component that includes the Navbar and wraps protected routes
const ProtectedLayout = ({ children, requireSpace = true }) => (
  <ProtectedRoute requireSpace={requireSpace}>
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
            <ProtectedRoute requireSpace={false}>
              <SpaceSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedLayout requireSpace={false}>
              <Home />
            </ProtectedLayout>
          }
        />
        <Route
          path='/space/:spaceId'
          element={
            <ProtectedLayout>
              <Space />
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
