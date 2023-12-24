import { Routes, Route } from 'react-router-dom'

import LoginScreen from './screen/LoginScreen'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import DashboardScreen from './screen/DashboardScreen'
import { ROLES } from './config/roles'
import Layout from './components/Layout'
import Prefetch from './features/auth/Prefetch'
import PostScreen from './screen/PostScreen'

function App() {

  return (
    <Routes>
      <Route element={<Prefetch />}>
        <Route path="login" element={<LoginScreen />} />
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route index element={<DashboardScreen />} />
              <Route path="posts" element={<PostScreen />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
