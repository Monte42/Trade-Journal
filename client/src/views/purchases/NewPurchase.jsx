import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JournalContext } from '../../App'
import TraderNav from '../../components/general/TraderNav'
import PurchaseForm from '../../components/purchases/PurchaseForm'

const NewPurchase = () => {
    const {id} = useParams()
    const [user] = useContext(JournalContext)
    const navigate = useNavigate()

    const createNewEquity = (purchase,symbol,sector,buyPrice,quantity) => {
        console.log('creating equity');
        axios.post('http://localhost:8000/api/equities',{
            portfolio: id,
            purchase,
            symbol,
            sector,
            buy_price: buyPrice,
            quantity,
            last_updated_price: buyPrice,
            price_difference: 0
        })
    }
    
    const createNewPurchase = (symbol,quantity,buy,buyTotal,sector,isSold,sell,sellTotal) => {
        console.log('creating purchase');
        axios.post(`http://localhost:8000/api/purchases`,{
            portfolio: id,
            symbol,
            quantity,
            share_buy_price:buy,
            total_buy_price:buyTotal,
            is_sold:isSold,
            share_sell_price:sell,
            total_sell_price:sellTotal,
            profit_loss:0
        })
            .then(res=>{
                console.log('now');
                createNewEquity(res.data.id,symbol,sector,buy,quantity)
            })
            .then(()=> navigate(`/${user.username}/portfolio`))
            .catch(err=>console.log(err))
        
    }

    return (
        <div>
            <TraderNav />
            <h2>Add a new Transaction</h2>
            <PurchaseForm submitProp={createNewPurchase} btnTitle={'Create'}/>
        </div>
    )
}

export default NewPurchase