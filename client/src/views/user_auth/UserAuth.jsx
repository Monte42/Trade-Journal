import UserCreate from "../../components/user_auth/UserCreate"
import UserLogin from "../../components/user_auth/UserLogin"

const UserAuth = () => {
    return (
        <div className=' text-center'>
            <h1 className='p-4'>Trade Journal</h1>
            <div className='row'>
                <div className='col-sm-10 col-md-8 col-lg-6 mx-auto'>
                    <div className="row g-0">
                        <div className="col-sm-8 col-md-6">
                            <UserCreate />
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <UserLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAuth