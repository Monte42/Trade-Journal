import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const PurchaseForm = ({submitProp,btnTitle,id}) => {
    const [symbol,setSymbol] = useState('')
    const [quantity,setQuantity] = useState(0)
    const [buy,setBuy] = useState(0)
    const [buyTotal,setBuyTotal] = useState(0)
    const [sector,setSector] = useState('Energy')
    const [isSold,setIsSold] = useState(false)
    const [sell,setSell] = useState(0)
    const [sellTotal,setSellTotal] = useState(0)

    useEffect(() => {
        if (id){
            axios.get(`http://localhost:8000/api/purchases/${id}`)
                .then(res =>{
                    setSymbol(res.data.symbol)
                    setQuantity(res.data.quantity)
                    setBuy(res.data.share_buy_price)
                    setBuyTotal(res.data.total_buy_price)
                    setIsSold(res.data.is_sold)
                    setSell(res.data.share_sell_price)
                    setSellTotal(res.data.total_sell_price)
                })
                .catch(err=>console.log(err))
        }
    },[])

    const submitHandler = e => {
        e.preventDefault()
        submitProp(symbol,quantity,buy,buyTotal,sector,isSold,sell,sellTotal)
    }

    return (
        <form className='flex-wrapper flex-col col-10 col-sm-6 col-md-4 mx-auto' onSubmit={submitHandler}>
            <label className='form-label'>Symbol
                <input className='form-control' type="text" value={symbol} onChange={e=>setSymbol(e.target.value)} />
            </label>
            <label className='form-label'>Quantity
                <input className='form-control' type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} />
            </label>
            <label className='form-label'>Buy Price/Share
                <input className='form-control' type="number" value={buy} onChange={e=>setBuy(e.target.value)} />
            </label>
            <label className='form-label'>Total Buy Price
                <input className='form-control' type="number" value={buyTotal} onChange={e=>setBuyTotal(e.target.value)} />
            </label>
            {id ? null :
            <label className='form-lable'>Sector
                <select className='form-select' value={sector} onChange={e=>setSector(e.target.value)}>
                    <option value="Energy">Energy</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            }
            <label className='form-label'>Is Sold
                <input className='form-check-input' type="checkbox" value={isSold} onChange={e=>setIsSold(true)} />
            </label>
            {isSold ? 
                <>
                <label className='form-label'>Sell Price/Share
                    <input className='form-control' type="number" onChange={e=>setSell(e.target.value)} />
                </label>
                <label className='form-label'>Total Sell Price
                    <input className='form-control' type="number" onChange={e=>setSellTotal(e.target.value)} />
                </label>
                </> : null
            }
            <button className='btn btn-secondary'>{btnTitle}</button>
        </form>
    )
}

export default PurchaseForm