import React from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JournalContext } from '../../App'
import axios from 'axios'
import PurchaseForm from '../../components/purchases/PurchaseForm'
import { useEffect } from 'react'
import { useState } from 'react'
import Footer from '../../components/general/Footer'
import TraderNav from '../../components/general/TraderNav'

const EditPurchase = () => {
    const {portID,purchID} = useParams()
    const [user] = useContext(JournalContext)
    const [equity,setEquity] = useState({})
    const [portfolio,setPortfolio] = useState({})
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/equities/purchase/${purchID}`)
            .then(res=> setEquity(res.data[0]))
            .catch(err=>console.log(err))
        axios.get(`http://localhost:8000/api/portfolios/user/${user.id}`)
            .then(res => setPortfolio(res.data))
            .catch(err => console.log(err))
    },[])

    const updatePurchase = (symbol,quantity,buy,buyTotal,sector,isSold,sell,sellTotal) => {
        let updatedPurchase = {
            portfolio: portID,
            symbol,
            quantity,
            share_buy_price:buy,
            total_buy_price:buyTotal,
            is_sold:isSold,
            share_sell_price:sell,
            total_sell_price:sellTotal
        }
        isSold ? updatedPurchase['profit_loss']=sellTotal-buyTotal : updatedPurchase['profit_loss']=0
        if (isSold) {
            axios.delete(`http://localhost:8000/api/equities/${equity.id}`)
            axios.put(`http://localhost:8000/api/portfolios/${portID}`,{
                user: user.id,
                account_number: portfolio.account_number,
                balance: parseFloat(portfolio.balance)+parseFloat(sellTotal)
            })
            
        }
        axios.put(`http://localhost:8000/api/purchases/${purchID}`, updatedPurchase)
            .then(() => navigate(`/${user.username}/portfolio`))
            .catch(err=>setErrors(err.response.data))
    }

    return (
        <div>
            <TraderNav message={user.name}/>
            <h2 className='header-style text-center'>Update Purchase</h2>
            <PurchaseForm 
                submitProp={updatePurchase}
                btnTitle={'Update'}
                errors={errors}
                id={purchID}
            />
            <Footer bottomOut={'bottom-out'} />
        </div>
    )
}

export default EditPurchase