import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TraderNav from '../../components/general/TraderNav'
import DeleteBtn from '../../components/general/DeleteBtn'
const DetailsPurchase = () => {
    const { id } = useParams()
    const [purchase, setPurchase] = useState({})
    const [notes,setNotes] = useState([])
    const [content,setContent] = useState('')

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
            })
            .catch(err=>console.log(err))
    }

    const getNotes = () => {
        axios.get(`http://localhost:8000/api/notes/purchase/${id}`)
            .then(res=> setNotes(res.data))
            .catch(err=> console.log(err))
    }

    return (
        <div>
            <TraderNav />
            <h2>{purchase.symbol}</h2>
            <div className='row'>
                <div className='col-10 col-sm-6'>
                    <ul>
                        <li>Price Per Share: ${purchase.share_buy_price}.00</li>
                        <li>Total Purchase Price: ${purchase.total_buy_price}.00</li>
                        <li>Quantity: {purchase.quantity}</li>
                        <li>Sold: {purchase.is_sold? 'Yes' : 'No'}</li>
                        <li>Profit Per Share: {purchase.share_sell_price?`$${purchase.share_sell_price-purchase.share_buy_price}.00`:`$0.00`}</li>
                        <li>Total Purchase Profit: {purchase.total_sell_price?`$${purchase.total_sell_price-purchase.total_buy_price}.00`:`$0.00`}</li>
                        <li>Purchase Enter Date: {new Date(purchase.created_at).toDateString()}</li>
                    </ul>
                </div>
                <div className='col-10 col-sm-6 mt-2'>
                    <h4>Thoughts</h4>
                    {notes&&
                        notes.map((n,i) => {
                            return(
                                <article key={i}>
                                    <p>{i+1}). {n.content}</p>
                                    <span className='ps-5'>{new Date(n.created_at).toDateString()}</span>
                                    <DeleteBtn 
                                        docModel={'notes'}
                                        docId={n.id}
                                        event={getNotes}
                                        title={'x'}
                                    />
                                </article>
                            )
                        })
                    }
                </div>
                <div className='row'>
                    <div className='col-10 col-sm-6'></div>
                    <div className='col-10 col-sm-6'>
                        <form className='col-10 mx-auto' onSubmit={createNote}>
                            <label className='form-label'>Have a new thought about this purchase?
                                <input className='form-control' type="text" value={content} onChange={e=>setContent(e.target.value)} />
                            </label><br/>
                            <button className='btn btn-secondary'>Add Note</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsPurchase