import axios from 'axios'
import { useState,useEffect } from 'react'
import TickerForm from './TickerForm'
import env from 'react-dotenv'

const TickerNews = () => {
    const [ticker,setTicker] = useState('')
    const [articles,setArticles] = useState([])

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = () => {
        axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${env.MARKET_API}`)
            .then(res => setArticles(res.data.feed))
            .catch(err=>console.log(err))
    }

    return (
        <div>
            <h4>{ticker} News</h4>
            <TickerForm ticker={ticker} setTicker={setTicker} submitProp={fetchData} />
            <table className='table table-striped table-dark table-hover overflow-auto news-table'>
                <tbody>
                    {articles && 
                        articles.map((a,i) => {
                            return(
                                <tr key={i}>
                                    <td className='px-5'>
                                        {a.banner_image ? <img src={a.banner_image} alt="Article Image" /> :
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4SWX-jvtdPn7Gutf0V1FeGYT3GNyYcNzGMQ&usqp=CAU' alt="Article Image" />
                                        }
                                    </td>
                                    <td className='px-3'>
                                        <a href={a.url} target="_blank">{a.title.slice(0,25)}</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TickerNews