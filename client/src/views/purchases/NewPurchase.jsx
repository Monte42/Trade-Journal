import { useState,useEffect,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JournalContext } from '../../App'
import axios from 'axios'
import TraderNav from '../../components/general/TraderNav'
import PurchaseForm from '../../components/purchases/PurchaseForm'
import Footer from '../../components/general/Footer'

const NewPurchase = () => {
    const {id} = useParams()
    const [user] = useContext(JournalContext)
    const [portfolio,setPortfolio] = useState({})
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/portfolios/${id}`)
            .then(res=> {
                setPortfolio(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const createNewEquity = (purchase,symbol,sector,buyPrice,quantity) => {
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

    const setNewBalance = (price) => {
        let isValid = false
        let p = portfolio
        p.balance = (p.balance-price).toFixed(2)
        if (p.balance>0){
            axios.put(`http://localhost:8000/api/portfolios/${id}`, {
                user: p.user,
                account_number: p.account_number,
                balance: p.balance
            })
                .catch(err=>console.log(err))
            isValid = true
        }
        return isValid
    }

    const createNewPurchase = (symbol,quantity,buy,buyTotal,sector,isSold,sell,sellTotal) => {
        if (!setNewBalance(buyTotal)) {
            alert("Sorry you dont have enough funds")
            return
        }
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
                createNewEquity(res.data.id,symbol,sector,buy,quantity)
                navigate(`/${user.username}/portfolio`)
            })
            .catch(err=> {
                console.log(err);
                setErrors(err.response.data)
            })
        
    }

    return (
        <div>
            <TraderNav message={user.name} />
            <h2 className='header-style text-center'>
                Add a new Transaction
            </h2>
            <PurchaseForm submitProp={createNewPurchase} btnTitle={'Create'} errors={errors}/>
            <Footer bottomOut={'bottom-out'}/>
        </div>
    )
}

export default NewPurchase