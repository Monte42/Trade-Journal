import { useState,useEffect,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JournalContext } from '../../App'
import TraderNav from '../../components/general/TraderNav'
import NameEmail from '../../components/user_auth/form_blocks/NameEmail'
import Footer from '../../components/general/Footer'
import axios from 'axios'


const EditUser = () => {
    const [user,setUser] = useContext(JournalContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [selectedFile,setSelectedFile] = useState()
    const [firstName, setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [updating,setUpdating] = useState(false)
    const [errors,setErrors] = useState({})

    
    useEffect(() => {
        if(user.id != id) navigate('/') 
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

    const changeFileHandler = e => setSelectedFile(e.target.files[0])

    const handleUpload = async () => {
        const {url} = await fetch('http://localhost:5000/s3Url')
                .then(res => res.json())
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: selectedFile
        })
        const imgURL = url.split('?')[0]
        console.log(imgURL);
        return imgURL
    }

    const submitHandler = async e =>{
        e.preventDefault()
        setUpdating(true)
        const userImg = await handleUpload()
        if(user.id != id) navigate('/')
        axios.put(`http://localhost:8000/api/users/${id}`, {
            first_name: firstName,
            last_name: lastName,
            email,
            username,
            user_image_url: userImg,
            password
        })
            .then(res => setUser({
                id: res.data.id,
                name: `${res.data.first_name} ${res.data.last_name}`,
                username: res.data.username,
                email: res.data.email,
                user_image_url: userImg,
                created_at: res.data.created_at
            }))
            .then(()=>navigate('/'))
            .catch(err=>{
                console.log(err);
                setErrors(err.response.data)
            })
    }

    return (
        <div>
            <TraderNav message={user.name}/>
            <h2 className='header-style text-center'>
                Edit your information
            </h2>
            <div className='row text-center'>
                {updating &&
                    <div className="spinner-border update-loader" role="status">
                        <span className="visually-hidden">Loading...</span>
                        <span>Updating...</span>
                    </div>
                }
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
                    <p className='mb-3'>
                        <label className='form-lable'> User Image
                            <input className='form-control' type="file" onChange={changeFileHandler} />
                        </label>
                    </p>
                    <button className='btn btn-secondary'>Update</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditUser