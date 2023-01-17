import { useState,useEffect } from 'react'
import axios from 'axios'

const PurchaseForm = ({submitProp,btnTitle,id,errors}) => {
    const [symbol,setSymbol] = useState('')
    const [quantity,setQuantity] = useState(0)
    const [buy,setBuy] = useState(0)
    const [buyTotal,setBuyTotal] = useState(0)
    const [sector,setSector] = useState('Energy')
    const [isSold,setIsSold] = useState(false)
    const [sell,setSell] = useState(0)
    const [sellTotal,setSellTotal] = useState(0)
    const [loaded,setLoaded] = useState(false)

    useEffect(() => {
        if (id){
            axios.get(`http://localhost:8000/api/purchases/${id}`)
                .then(res =>{
                    console.log(res.data.symbol);
                    setSymbol(res.data.symbol)
                    setQuantity(res.data.quantity)
                    setBuy(res.data.share_buy_price)
                    setBuyTotal(res.data.total_buy_price)
                    setIsSold(res.data.is_sold)
                    setSell(res.data.share_sell_price)
                    setSellTotal(res.data.total_sell_price)
                })
                .then(()=>setLoaded(true))
                .catch(err=>console.log(err))
        } else setLoaded(true)
    },[])

    const submitHandler = e => {
        e.preventDefault()
        submitProp(symbol,quantity,buy,buyTotal,sector,isSold,sell,sellTotal)
    }

    return (
        <>
        {loaded ?
            <form className='flex-wrapper flex-col col-10 col-sm-6 col-md-4 mx-auto' onSubmit={submitHandler}>
                <label className='form-label'>Symbol
                    <input className='form-control' type="text" value={symbol} onChange={e=>setSymbol(e.target.value.toUpperCase())} />
                </label>
                {errors.symbol && <p className='error'>{errors.symbol}</p>}
                <label className='form-label'>Quantity
                    <input className='form-control' type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} />
                </label>
                {errors.quantity && <p className='error'>{errors.quantity}</p>}
                <label className='form-label'>Buy Price/Share
                    <input className='form-control' type="number" step='0.01' value={buy} onChange={e=>setBuy(e.target.value)} />
                </label>
                {errors.share_buy_price && <p className='error'>{errors.share_buy_price}</p>}
                <label className='form-label'>Total Buy Price
                    <input className='form-control' type="number" step='0.01' value={buyTotal} onChange={e=>setBuyTotal(e.target.value)} />
                </label>
                {errors.total_buy_price && <p className='error'>{errors.total_buy_price}</p>}
                {id ? null :
                <label className='form-lable'>Sector
                    <select className='form-select' value={sector} onChange={e=>setSector(e.target.value)}>
                        <option value="Energy">Energy</option>
                        <option value="Materials">Materials</option>
                        <option value="Industrials">Industrials</option>
                        <option value="Consumer Discretionary">Consumer Discretionary</option>
                        <option value="Consumer Staples">Consumer Staples</option>
                        <option value="Health Care">Health Care</option>
                        <option value="Financials">Financials</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Telecommunication Services">Telecommunication Services</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Real Estate">Real Estate</option>
                    </select>
                </label>
                }
                <label className='form-label'>Is Sold &nbsp;
                    <input className='form-check-input' type="checkbox" value={isSold} onChange={e=>setIsSold(true)} />
                </label>
                {isSold ? 
                    <>
                    <label className='form-label'>Sell Price/Share
                        <input className='form-control' type="number" step='0.01' onChange={e=>setSell(e.target.value)} />
                    </label>
                    <label className='form-label'>Total Sell Price
                        <input className='form-control' type="number" step='0.01' onChange={e=>setSellTotal(e.target.value)} />
                    </label>
                    </> : null
                }
                <button className='btn btn-secondary'>{btnTitle}</button>
            </form>
            : <p>Loading</p>
        }
        </>
    )
}

export default PurchaseForm