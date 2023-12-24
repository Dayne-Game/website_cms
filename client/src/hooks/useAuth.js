import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "user"

    if (token) {
        const decoded = jwtDecode(token)
        const { firstname, lastname, email } = decoded.UserInfo
        const roles = decoded.Roles

        isManager = roles.includes('manager')
        isAdmin = roles.includes('admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { firstname, lastname, email, roles, status, isManager, isAdmin }
    }

    return { firstname: '', lastname: '', email: '', roles: [], isManager, isAdmin, status }
}
export default useAuth