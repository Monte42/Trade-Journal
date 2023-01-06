import { useState,useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

const Earnings = ({ticker}) => {
    const [earningsData,setEarningsData] = useState([])

    useEffect(() => {
        axios.get(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${env.MARKET_API}`)
            .then(res=>setEarningsData(res.data.quarterlyEarnings.slice(0,12)))
            .catch(err=>console.log(err))
    },[ticker])

    return (
        <div>
            <h3>Earnings {ticker}</h3>
            <table className='table table-dark table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Fiscal End Date</th>
                        <th>Estimated EPS</th>
                        <th>Reported EPS</th>
                        <th>Surprise</th>
                    </tr>
                </thead>
                <tbody>
                    {earningsData &&
                        earningsData.map((q,i) => {
                            return(
                                <tr key={i}>
                                    <td>{q.fiscalDateEnding}</td>
                                    <td>{q.estimatedEPS}</td>
                                    <td>{q.reportedEPS}</td>
                                    <td>{q.surprise}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Earnings