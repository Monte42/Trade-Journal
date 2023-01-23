import Footer from "../../components/general/Footer"
import UserCreate from "../../components/user_auth/UserCreate"
import UserLogin from "../../components/user_auth/UserLogin"

const UserAuth = () => {
    return (
        <div className=' text-center'>
            <img style={{width:'100vw'}} src="static/images/banner.png" alt="" />
            <div className='row mt-4'>
                <div className='col-sm-10 col-md-8 col-lg-6 mx-auto'>
                    <div className="row g-0">
                        <div className="col-sm-8 col-md-6 mx-auto">
                            <h3 className='header-style text-center'>Register</h3>
                            <UserCreate />
                        </div>
                        <div className="col-sm-8 col-md-6 mx-auto">
                            <h3 className='header-style text-center '>Sign In</h3>
                            <UserLogin />
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            <Footer />
        </div>
    )
}

export default UserAuth