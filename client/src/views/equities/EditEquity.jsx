import { useState,useEffect,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JournalContext } from '../../App'
import Footer from '../../components/general/Footer'
import TraderNav from '../../components/general/TraderNav'
import axios from 'axios'

const EditEquity = () => {
    const [user] = useContext(JournalContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [equity,setEquity] = useState({})
    const [error,setError] = useState({})
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
            price_difference: (newValue-equity.buy_price).toFixed(2)
        })
            .then(()=>navigate(`/${user.username}/portfolio`))
            .catch(err=>setError(err.response.data))
    }

    return (
        <div>
            <TraderNav message={equity.symbol}/>
            <h2 className='header-style text-center'>
                Update Current Value
            </h2>
            <form onSubmit={updateEquity}
                style={{
                    margin:'0 auto',
                    width:'fit-content',
                    fontSize:'1.5em',
                    textShadow:'3px 3px 5px black'
            }}>
                <label className='form-lable'>$
                    <input className='form-control-lg' type="number" value={newValue} onChange={e=>setNewValue(e.target.value)} />
                </label>
                {error.last_updated_price && <p className='error'>{error.last_updated_price}</p>}
                <button className='btn btn-secondary btn-lg'>Update</button>
            </form>
            <Footer bottomOut={'bottom-out'} />
        </div>
    )
}

export default EditEquity