import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PorL from '../../purchases/PorL'

const Purchases = ({portfolioID,purchases,setPurchases}) => {

    useEffect(() =>{
        if (portfolioID) {
            axios.get(`http://localhost:8000/api/purchases/portfolio/${portfolioID}`)
                .then(res=>setPurchases(res.data))
                .catch(err=>console.log(err))
        }
    },[portfolioID])


    return (
        <div className='col-10 col-md-4 p-3'>
            <h4>Purchase History <Link className='btn btn-sm btn-secondary' to={`/purchases/${portfolioID}/new`}>New</Link></h4>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Quantity</th>
                        <th>Total Buy</th>
                        <th>Total Sell</th>
                        <th>Profit/Loss</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        purchases.map((p,i) => (
                            <tr key={i}>
                                <td>{p.symbol}</td>
                                <td>{p.quantity}</td>
                                <td>{p.total_buy_price}</td>
                                <td>{p.total_sell_price?p.total_sell_price:'N/A'}</td>
                                {p.profit_loss?<PorL pnl={p.profit_loss}/> :<td>N/A</td>}
                                <td>
                                    <Link style={{color:'blue'}} to={`/purchases/${p.id}`}>View</Link>
                                {!p.is_sold &&
                                <span>
                                    | <Link style={{color:'blue'}} to={`/purchases/${portfolioID}/${p.id}/edit`}>Update</Link>
                                </span>
                                }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Purchases