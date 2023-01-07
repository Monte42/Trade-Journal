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
        <div className='col-10 col-sm-4 p-3'>
            <h4>Equities</h4>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Buy Price</th>
                        <th>Last Price</th>
                        <th>Difference</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equities.map((e,i)=>(
                            <tr key={i}>
                                <td>{e.symbol}</td>
                                <td>{e.buy_price}</td>
                                <td>{e.last_updated_price}</td>
                                {e.price_difference===0 ? <td>{e.price_difference}</td> :
                                <PorL pnl={e.price_difference} />
                                }
                                <td><Link className='btn btn-secondary btn-sm' to={`/equities/${e.id}`}>Update</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Equities