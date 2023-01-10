import { useState,useEffect,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { JournalContext } from '../../App'
import TraderNav from '../../components/general/TraderNav'
import NameEmail from '../../components/user_auth/form_blocks/NameEmail'
import Footer from '../../components/general/Footer'


const EditUser = () => {
    const [user,setUser] = useContext(JournalContext)
    const { id } = useParams()
    const [firstName, setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {  // Getting user from DB so I dont have to store pwd
        if(user.id != id) navigate('/')  // in the Local Storage
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                setFirstName(res.data.first_name)
                setLastName(res.data.last_name)
                setEmail(res.data.email)
                setUsername(res.data.username)
                setPassword(res.data.password)
            })
            .catch(err=>console.log(err))
    },[])

    const submitHandler = e =>{
        e.preventDefault()
        if(user.id != id) navigate('/')
        axios.put(`http://localhost:8000/api/users/${id}`, {
            first_name: firstName,
            last_name: lastName,
            email,
            username,
            password
        })
            .then(res => setUser({ // Updating Session 
                id: res.data.id,
                name: `${res.data.first_name} ${res.data.last_name}`,
                username: res.data.username
            }))
            .then(()=>navigate('/'))
            .catch(err=>setErrors(err.response.data))
    }

    return (
        <div>
            <TraderNav message={user.name}/>
            <h2 className='header-style text-center'>
                Edit your information
            </h2>
            <div className='row text-center'>
                <form style={{margin:'0 auto'}} className='col-sm-8 col-md-6 col-lg-4' onSubmit={submitHandler}>
                    {errors.message && <p className='error'>{errors.message}</p>}
                    <NameEmail 
                        firstName={firstName} setFirstName={setFirstName}
                        lastName={lastName} setLastName={setLastName}
                        email={email} setEmail={setEmail}
                        errors={errors}
                    />
                    <p className='mb-3'>
                        <label className='form-lable'> Username
                            <input className='form-control' type="text" value={username} onChange={e=>setUsername(e.target.value)} />
                        </label>
                    </p>
                    {errors.username && <p className='error'>{errors.username}</p>}
                    <button className='btn btn-secondary'>Update</button>
                </form>
            </div>
            <Footer bottomOut={'bottom-out'} />
        </div>
    )
}

export default EditUser