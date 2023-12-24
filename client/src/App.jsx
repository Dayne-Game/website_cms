import { Routes, Route } from 'react-router-dom'

import LoginScreen from './screen/LoginScreen'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import DashboardScreen from './screen/DashboardScreen'
import { ROLES } from './config/roles'
import Layout from './components/Layout'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginScreen />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route path="dashboard" element={<DashboardScreen />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
