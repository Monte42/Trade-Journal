import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { JournalContext } from '../../App'
import axios from 'axios'
import NameEmail from './form_blocks/NameEmail'
import UserPwd from './form_blocks/UserPwd'

const UserCreate = () => {
    const [,setUser] = useContext(JournalContext)
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/new", {
            first_name: firstName,
            last_name: lastName,
            email,
            username,
            password,
            confirmPassword
        })
        .then(res => { // Setting Session
            setUser({
                id: res.data.id,
                name: `${res.data.first_name} ${res.data.last_name}`,
                email: res.data.email,
                created_at: res.data.created_at,
                username: res.data.username
            })
        })
        .then(()=> navigate('/'))
        .catch(err => setErrors(err.response.data))
    }

    return (
        <form onSubmit={submitHandler}>
            <NameEmail 
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                email={email} setEmail={setEmail}
                errors={errors}
            />
            <UserPwd 
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                usernameError={errors.username} passwordError={errors.password}
            />
            <p className='mb-3'>
                <label className='form-lable'> Confirm Password
                    <input className='form-control' type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </label>
            </p>
            {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
            <button className='btn btn-primary'>Register</button>
        </form>
    )
}

export default UserCreate