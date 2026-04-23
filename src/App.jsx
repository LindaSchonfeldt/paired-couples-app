import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar, ProtectedRoute } from './components'
import {
  Calendars,
  CreateList,
  Home,
  Lists,
  Login,
  Register,
  Space,
  Spaces,
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
            <ProtectedLayout requireSpace={true}>
              <Space />
            </ProtectedLayout>
          }
        />
        <Route
          path='/calendars'
          element={
            <ProtectedLayout requireSpace={true}>
              <Calendars />
            </ProtectedLayout>
          }
        />
        <Route
          path='/lists'
          element={
            <ProtectedLayout requireSpace={true}>
              <Lists />
            </ProtectedLayout>
          }
        />
        <Route
          path='/lists/new'
          element={
            <ProtectedLayout requireSpace={true}>
              <CreateList />
            </ProtectedLayout>
          }
        />
        <Route
          path='/spaces'
          element={
            <ProtectedLayout requireSpace={true}>
              <Spaces />
            </ProtectedLayout>
          }
        />
        <Route
          path='/create-space'
          element={
            <ProtectedLayout requireSpace={false}>
              <SpaceSetup />
            </ProtectedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
