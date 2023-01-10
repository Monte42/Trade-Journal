import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const EquityForm = ({submitProp,btnTitle,helpText}) => {
    const {id} = useParams()
    const [symbol,setSymbol] = useState('')
    const [sector,setSector] = useState('Energy')
    const [buyPrice,setBuyPrice] = useState(0)
    const [quantity,setQuantity] = useState(0)
    const [lastUpdatePrice,setLastUpdatedPrice] = useState(0)

    useEffect(()=>{
        if (id) {
            axios.get(`http://localhost:8000/api/equities/${id}`)
            .then(res => {
                setSymbol(res.data.symbol)
                setSector(res.data.sector)
                setBuyPrice(res.data.buy_price)
                setQuantity(res.data.quantity)
                setLastUpdatedPrice(res.data.last_updated_price)
            })
            .catch(err=>console.log(err))
        }
    },[])

    const submitHandler = e => {
        e.preventDefault()
        submitProp(symbol,sector,buyPrice,quantity,lastUpdatePrice)
    }

    return (
        <form className='flex-wrapper flex-col col-10 col-sm-6 col-md-4 mx-auto' onSubmit={submitHandler}>
            <label className='form-label'>Symbol
                <input className='form-control' type="text" value={symbol} onChange={e=>setSymbol(e.target.value)} />
            </label>
            <label className='form-label'>Sector
                <input className='form-control' type="text" value={sector} onChange={e=>setSector(e.target.value)} />
            </label>
            <label className='form-label'>Buy Price
                <input className='form-control' type="number" step="0.01" value={buyPrice} onChange={e=>setBuyPrice(e.target.value)} />
            </label>
            <label className='form-label'>Quatity
                <input className='form-control' type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} />
            </label>
            <label className='form-label'>Last Noted Price
                <input className='form-control' type="number" value={lastUpdatePrice} 
                onChange={e=>setLastUpdatedPrice(e.target.value)} aria-describedby="passwordHelpInline"/>
            </label>
            <span id="passwordHelpInline" className="form-text mb-2">
                {helpText}
            </span>
            <button className='btn btn-secondary col-3'>{btnTitle}</button>
        </form>
    )
}

export default EquityForm