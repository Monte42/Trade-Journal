import axios from 'axios'
import EquityForm from '../../components/equities/EquityForm'
import TraderNav from '../../components/general/TraderNav'



const NewEquitity = () => {

    const createEquity = (symbol,sector,buyPrice,quantity,lastUpdatedPrice) => {
        axios.post('http://localhost:8000/api/equities',{
            symbol,
            sector,
            buy_price: buyPrice,
            quantity,
            last_updated_price: lastUpdatedPrice,
            price_difference: lastUpdatedPrice-buyPrice
        })
    }

    return (
        <div>
            <TraderNav />
            <h2>Add Equity</h2>
            <EquityForm 
                submitProp={createEquity} 
                btnTitle={'Add'} 
                helpText={'For Creating a new Equity just enter buy price here'}
            />
        </div>
    )
}

export default NewEquitity