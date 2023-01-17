import { useState,useEffect,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { JournalContext } from '../../App'
import TraderNav from '../../components/general/TraderNav'
import Footer from '../../components/general/Footer'
import PorL from './PorL'
import axios from 'axios'
import Note from '../../components/notes/Note'

const DetailsPurchase = () => {
    const [user] = useContext(JournalContext)
    const { id } = useParams()
    const [purchase, setPurchase] = useState({})
    const [notes,setNotes] = useState([])
    const [content,setContent] = useState('')
    const [error,setError] = useState({})

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/purchases/${id}`)
            .then(res=> setPurchase(res.data))
            .catch(err=> console.log(err))
    },[])

    useEffect(()=> {
        getNotes()
    },[])

    const createNote = e => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/notes`, {
            purchase: id,
            content
        })
            .then(res => {
                setNotes([...notes,res.data])
                setContent('')
                setError({})
            })
            .catch(err=>setError(err.response.data))
    }

    const getNotes = () => {
        axios.get(`http://localhost:8000/api/notes/purchase/${id}`)
            .then(res=> setNotes(res.data))
            .catch(err=> console.log(err))
    }

    return (
        <div>
            <TraderNav message={user.name} />
            <h2 className='header-style ms-1'>{purchase.symbol}</h2>
            <div className='row ms-3'>
                <div className='col-10 col-md-5 m-3 p-3 purchaseCard'>
                    <h4 className='header-style' >Details</h4>
                    <ul className='list-group list-group-flush rounded'>
                        <li className='list-group-item list-group-item-dark'>Price Per Share: ${purchase.share_buy_price}</li>
                        <li className='list-group-item list-group-item-dark'>Total Purchase Price: ${purchase.total_buy_price}</li>
                        <li className='list-group-item list-group-item-dark'>Quantity: {purchase.quantity}</li>
                        <li className='list-group-item list-group-item-dark'>Sold: {purchase.is_sold? 'Yes' : 'No'}</li>
                        <li className='list-group-item list-group-item-dark'>Sold Price Per Share: ${purchase.share_sell_price}</li>
                        <li className='list-group-item list-group-item-dark'>Total Sold Price: <PorL beatPrice={purchase.total_buy_price} pnl={purchase.total_sell_price} /></li>
                        <li className='list-group-item list-group-item-dark'>Profit Per Share: {purchase.share_sell_price?<span><PorL beatPrice={0} pnl={purchase.share_sell_price-purchase.share_buy_price}/></span>:`$0`}</li>
                        <li className='list-group-item list-group-item-dark'>Total Purchase Profit: {purchase.total_sell_price?<span><PorL beatPrice={0} pnl={purchase.total_sell_price-purchase.total_buy_price}/></span>:`$0`}</li>
                        <li className='list-group-item list-group-item-dark'>Purchase Enter Date: {new Date(purchase.created_at).toDateString()}</li>
                    </ul>
                </div>
                <div className='col-10 col-md-5 m-3 p-3 purchaseCard'>
                    <h4 className='header-style' >Thoughts</h4>
                    <div className='overflow-auto height-40'>
                        {notes&&
                            notes.map((n,i) => {
                                return(
                                    <Note key={i} index={i} note={n} id={id} getNotes={getNotes}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-10 col-sm-6'></div>
                <div className='col-10 col-sm-6'>
                    <form className='col-10 mx-auto' onSubmit={createNote}>
                        <label className='form-label'>Have a new thought about this purchase?
                            <input className='form-control' type="text" value={content} onChange={e=>setContent(e.target.value)} />
                        </label>
                        {error.content && <p className='error'>{error.content}</p>}
                        <br/>
                        <button className='btn btn-secondary'>Add Note</button>
                    </form>
                </div>
            </div>
            <br/><br/><br/>
            <Footer />
        </div>
    )
}

export default DetailsPurchase