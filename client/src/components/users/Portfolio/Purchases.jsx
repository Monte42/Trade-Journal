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
        <div className='col-12 col-md-5 p-3'>
            <h4 className='header-style'>
                Purchase History 
                <Link className='btn btn-sm btn-secondary ms-5' to={`/purchases/${portfolioID}/new`}>New</Link>
            </h4>
            <table 
                className='overflow-auto table table-dark table-striped table-hover'
                style={{height:'25vw', width:'fit-content', margin:'0 auto', borderRadius:'10px',boxShadow:'5px 5px 5px #777'}}
                >
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Quantity</th>
                        <th>Profit/Loss</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        purchases.map((p,i) => (
                            <tr key={i}>
                                <td className='text-center'>{p.symbol}</td>
                                <td className='text-center'>{p.quantity}</td>
                                {p.profit_loss!=='0.00'?<PorL pnl={p.profit_loss}/> :<td className='text-center'>N/A</td>}
                                <td className='text-center'>
                                    <Link style={{color:'#fff'}} to={`/purchases/${p.id}`}>View</Link>&nbsp;
                                {!p.is_sold &&
                                <span>
                                    | <Link style={{color:'#fff'}} to={`/purchases/${portfolioID}/${p.id}/edit`}>Update</Link>
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