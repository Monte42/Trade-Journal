import axios from 'axios'
import { useState,useEffect } from 'react'
import env from 'react-dotenv'
import TickerForm from './TickerForm'

const TickerStats = () => {
    const [ticker,setTicker] = useState("AAPL")
    const [data,setData] = useState({})

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = () => {
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${env.MARKET_API}`)
            .then(res=>setData(res.data['Global Quote']))
            .catch(err=> console.log(err))
    }

    

    return (
        <div className='px-4 py-4'>
            <h4>{ticker} Quick Stats</h4>
            <TickerForm ticker={ticker} setTicker={setTicker} submitProp={fetchData} />
            <div>
                <ul className='list-group list-group-flush list-hover'>
                        <li className='list-group-item'>Recent Open: {data['02. open']}</li>
                        <li className='list-group-item'>Recent High: {data['03. high']}</li>
                        <li className='list-group-item'>Recent Low: {data['04. low']}</li>
                        <li className='list-group-item'>Last Price: {data['05. price']}</li>
                        <li className='list-group-item'>Recent Volume: {data['06. volume']}</li>
                        <li className='list-group-item'>Last Day Traded: {data['07. latest trading day']}</li>
                        <li className='list-group-item'>Previous Close: {data['08. previous close']}</li>
                        <li className='list-group-item'>Latest Daily Change: {data['09. change']}</li>
                        <li className='list-group-item'>Latest Change Percent: {data['10. change percent']}</li>
                </ul>
            </div>
        </div>
    )
}

export default TickerStats