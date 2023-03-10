import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { JournalContext } from '../../App'
import UserPwd from './form_blocks/UserPwd'
import axios from 'axios'

const UserLogin = () => {
    const [,setUser] = useContext(JournalContext)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/login", {
            username,
            password
        })
            .then(res => {
                setUser({
                    id: res.data.id,
                    name: `${res.data.first_name} ${res.data.last_name}`,
                    username: res.data.username,
                    email: res.data.email,
                    user_image_url: res.data.user_image_url,
                    created_at: res.data.created_at
                })
            })
            .then(() => navigate('/'))
            .catch(err => setErrors(err.response.data))
    }

    return (
        <form onSubmit={submitHandler}>
            {errors.message && <p className='error' style={{margin:'0 auto'}}>{errors.message}</p>}
            <UserPwd 
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
            />
            <button className='btn btn-primary'>Login</button>
        </form>
    )
}

export default UserLogin