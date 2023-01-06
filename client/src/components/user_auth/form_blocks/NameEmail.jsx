const NameEmail = ({firstName,setFirstName,lastName,setLastName,email,setEmail,errors}) => {
    return (
        <>
            <p className='mb-3'>
                <label className='form-lable'> First Name
                    <input className='form-control' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </label>
            </p>
            {errors.first_name && <p className='error'>{errors.first_name}</p>}
            <p className='mb-3'>
                <label className='form-lable'> Last Name
                    <input className='form-control' type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                </label>
            </p>
            {errors.last_name && <p className='error'>{errors.last_name}</p>}
            <p className='mb-3'>
                <label className='form-lable'> Email
                    <input className='form-control' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
            </p>
            {errors.email && <p className='error'>{errors.email}</p>}
        </>
    )
}

export default NameEmail