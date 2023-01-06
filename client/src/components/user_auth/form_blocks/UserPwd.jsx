const UserPwd = ({username,setUsername,password,setPassword,usernameError,passwordError}) => {
    return (
        <>
            <p className='mb-3'>
                <label className='form-lable'> Username
                    <input className='form-control' type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
            </p>
            {usernameError && <p className='error'>{usernameError}</p>}
            <p className='mb-3'>
                <label className='form-lable'> Password
                    <input className='form-control' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
            </p>
            {passwordError && <p className='error'>{passwordError}</p>}
        </>
    )
}

export default UserPwd