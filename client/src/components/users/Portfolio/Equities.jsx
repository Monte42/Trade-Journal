import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PorL from '../../purchases/PorL'

const Equities = ({portfolioID,equities,setEquities}) => {

    useEffect(() => {
        if (portfolioID) {
            axios.get(`http://localhost:8000/api/equities/portfolio/${portfolioID}`)
                .then(res=>setEquities(res.data))
        }
    },[portfolioID])
    return (
        <div className='col-12 col-md-5 p-3'>
            <h4 className='header-style'>Equities</h4>
            <table
                className='overflow-auto table table-striped table-dark table-hover' 
                style={{height:'25vw', width:'fit-content', borderRadius:'10px',boxShadow:'5px 5px 5px #777',margin:'0 auto'}}
            >
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Buy Price</th>
                        <th>Last Price</th>
                        <th>Difference</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equities.map((e,i)=>(
                            <tr key={i}>
                                <td style={{textAlign:'center'}}>{e.symbol}</td>
                                <td style={{textAlign:'center'}}>{e.buy_price}</td>
                                <td style={{textAlign:'center'}}>{e.last_updated_price}</td>
                                {e.price_difference==='0.00' ? <td style={{textAlign:'center'}}>{e.price_difference}</td> :
                                <PorL pnl={e.price_difference} />
                                }
                                <td style={{textAlign:'center'}}><Link className='btn btn-secondary btn-sm' to={`/equities/${e.id}`}>Update</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Equities