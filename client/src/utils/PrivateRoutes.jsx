import { useContext } from "react"
import {Navigate, Outlet} from "react-router-dom"
import { JournalContext } from '../App'

const PrivateRoutes = () => {
    const [user] = useContext(JournalContext)
    if (!user) {
        return <Navigate to="/register"/>
    }
    return  <Outlet/> 
}

export default PrivateRoutes