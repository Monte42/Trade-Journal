import { useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { JournalContext } from '../../App'

const TraderNav = ({message}) => {
    const [user,setUser,time] = useContext(JournalContext)
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        navigate('/register')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>Trade Journal</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse row" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-sm-12 col-md-10">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={"/details"}>Look Up A Company</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={""}>page 2</Link>
                            </li>
                            
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-md-12 col-lg-2 ">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Account
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item" >
                                        <Link className="nav-link" aria-current="page" to={`/user/${user.id}/edit`}>Edit</Link>
                                    </li>
                                    <li className="nav-item" >
                                        <Link className="nav-link" aria-current="page" to={`/${user.username}/portfolio`}>Portfolio</Link>
                                    </li>
                                    <li>
                                        <a className="nav-link logout-btn" onClick={logout}>Logout</a>
                                    </li>
                                </ul>
                            </li>
                            <Link to={`/${user.username}/portfolio`}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT04s_fztbv3ncwe0O_x5tbAmgLZCsPKorMzw&usqp=CAU" style={{width:"30px", height:"30px", borderRadius:"50%"}} />
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='flex-wrapper flex-justify-between px-5 py-4 bg-dark text-light'>
                <h2>{message}</h2>
                <h3>{time.getMonth()+1}/{time.getDate()}/{time.getFullYear()} {time.getHours() % 12 || 12}:{time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes() }</h3>
            </div>
        </>
    )
}

export default TraderNav