import { useState } from 'react'

const CreateEditPortfolio = ({submitProp, title, error}) => {
    const [accountBalance,setAccountBalance] = useState(0)

    const submitHandler = e => {
        console.log(error);
        e.preventDefault()
        submitProp(accountBalance)
        setAccountBalance(0)
    } 

    return (
        <div className='container mt-3'>
            {title}
            <form onSubmit={submitHandler}>
                <label className='form-label'> Current Balance:
                    <input className='form-control' type="number" step='0.01' value={accountBalance} onChange={e=>setAccountBalance(e.target.value)} />
                </label>
                {error.balance && <p className="error">{error.balance}</p>}
                <p><button className='btn btn-success'>Submit</button></p>
            </form>
        </div>
    )
}

export default CreateEditPortfolio