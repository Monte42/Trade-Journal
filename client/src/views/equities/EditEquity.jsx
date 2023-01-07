import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JournalContext } from '../../App'
import TraderNav from '../../components/general/TraderNav'
const EditEquity = () => {
    const [user] = useContext(JournalContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [equity,setEquity] = useState({})
    const [newValue,setNewValue] = useState(0)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/equities/${id}`)
            .then(res => {
                setEquity(res.data)
                setNewValue(res.data.last_updated_price)
            })
            .catch(err => console.log(err))
    },[])

    const updateEquity = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/equities/${id}`,{
            portfolio: equity.portfolio,
            purchase: equity.purchase,
            symbol: equity.symbol,
            sector: equity.sector,
            buy_price: equity.buy_price,
            quantity: equity.quantity,
            last_updated_price: newValue,
            price_difference: newValue-equity.buy_price
        })
            .then(()=>navigate(`/${user.username}/portfolio`))
            .catch(err=>console.log(err))
    }

    return (
        <div>
            <TraderNav message={equity.symbol}/>
            <h2>Update Current Value</h2>
            <form onSubmit={updateEquity}>
                <label>$
                    <input type="number" value={newValue} onChange={e=>setNewValue(e.target.value)} />
                </label>
                <button className='btn btn-secondary btn-sm'>Update</button>
            </form>
        </div>
    )
}

export default EditEquity