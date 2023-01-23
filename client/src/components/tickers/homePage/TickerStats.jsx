import { useState,useEffect } from 'react'
import TickerForm from './TickerForm'
import env from 'react-dotenv'
import axios from 'axios'

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
        <div className='py-4'>
            <h4 className='header-style'>{ticker} Quick Stats</h4>
            <TickerForm ticker={ticker} setTicker={setTicker} submitProp={fetchData} />
            <div>
                <ul 
                    className='list-group list-group-flush list-hover'
                    style={{borderRadius:'0 0 5px 5px'}}
                >
                    <li className='list-group-item list-group-item-dark'><strong>Recent Open:</strong> ${parseFloat(data['02. open']).toFixed(2)}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Recent High:</strong> ${parseFloat(data['03. high']).toFixed(2)}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Recent Low:</strong> ${parseFloat(data['04. low']).toFixed(2)}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Last Price:</strong> ${parseFloat(data['05. price']).toFixed(2)}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Recent Volume:</strong> {data['06. volume']}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Last Day Traded:</strong> {new Date(data['07. latest trading day']).toDateString()}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Previous Close:</strong> ${parseFloat(data['08. previous close']).toFixed(2)}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Latest Daily Change:</strong> ${data['09. change']}</li>
                    <li className='list-group-item list-group-item-dark'><strong>Latest Change Percent:</strong> {data['10. change percent']}</li>
                </ul>
            </div>
        </div>
    )
}

export default TickerStats