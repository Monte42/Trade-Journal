import { useState } from 'react'

const CreateEditPortfolio = ({submitProp, title}) => {
    const [accountBalance,setAccountBalance] = useState(0)

    const submitHandler = e => {
        e.preventDefault()
        submitProp(accountBalance)
        setAccountBalance(0)
    } 

    return (
        <div>
            {title}
            <form onSubmit={submitHandler}>
                <label className='form-label'> Current Balance:
                    <input className='form-control' type="number" step='0.01' value={accountBalance} onChange={e=>setAccountBalance(e.target.value)} />
                </label>
                <p><button className='btn btn-success'>Submit</button></p>
            </form>
        </div>
    )
}

export default CreateEditPortfolio