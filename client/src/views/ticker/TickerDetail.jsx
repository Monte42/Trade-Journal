import { useState } from 'react'
import TickerChart from '../../components/tickers/details/TickerChart.jsx'
import TraderNav from '../../components/general/TraderNav'
import IncomeStatement from '../../components/tickers/details/IncomeStatement'
import BalanceSheet from '../../components/tickers/details/BalanceSheet'
import CashFlow from '../../components/tickers/details/CashFlow'
import Earnings from '../../components/tickers/details/Earnings'
import TickerSearchForm from '../../components/tickers/details/TickerSearchForm'
import Footer from '../../components/general/Footer.jsx'

const TickerDetail = () => {
    const [ticker,setTicker] = useState('TSLA')
    const [chartURL,setChartURL] = useState(`https://api.polygon.io/v2/aggs/ticker/TSLA/range/15/minute/2022-12-29/2022-12-29?adjusted=true&sort=asc&apiKey=`)

    return (
        <div>
            <TraderNav message={ticker}/>
            <TickerSearchForm ticker={ticker} setTicker={setTicker} setChartURL={setChartURL}/>
            <div className='px-4'>
                <TickerChart chartURL={chartURL} ticker={ticker}/>
            </div>
            <IncomeStatement ticker={ticker} />
            <BalanceSheet ticker={ticker} />
            <CashFlow ticker={ticker} />
            <Earnings ticker={ticker} />
            <Footer />
        </div>
    )
}

export default TickerDetail
