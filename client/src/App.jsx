import { Routes, Route } from 'react-router-dom'

import LoginScreen from './screen/LoginScreen'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import DashboardScreen from './screen/DashboardScreen'
import { ROLES } from './config/roles'
import Layout from './components/Layout'
import Prefetch from './features/auth/Prefetch'

function App() {

  return (
    <Routes>
      <Route path="login" element={<LoginScreen />} />
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route index element={<DashboardScreen />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
