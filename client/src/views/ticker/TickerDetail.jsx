import { useState } from 'react'
import TickerChart from '../../components/tickers/details/TickerChart.jsx'
import TraderNav from '../../components/general/TraderNav'
import IncomeStatement from '../../components/tickers/details/IncomeStatement'
import BalanceSheet from '../../components/tickers/details/BalanceSheet'
import CashFlow from '../../components/tickers/details/CashFlow'
import Earnings from '../../components/tickers/details/Earnings'
import TickerSearchForm from '../../components/tickers/details/TickerSearchForm'

const TickerDetail = () => {
    const [ticker,setTicker] = useState('TSLA')
    const [chartURL,setChartURL] = useState(`https://api.polygon.io/v2/aggs/ticker/TSLA/range/15/minute/2022-12-29/2022-12-29?adjusted=true&sort=asc&apiKey=`)

    return (
        <div>
            <TraderNav />
            <TickerSearchForm ticker={ticker} setTicker={setTicker} setChartURL={setChartURL}/>
            <div className='ps-4'>
                <TickerChart chartURL={chartURL} ticker={ticker}/>
            </div>
            <IncomeStatement ticker={ticker} />
            <BalanceSheet ticker={ticker} />
            <CashFlow ticker={ticker} />
            <Earnings ticker={ticker} />
        </div>
    )
}

export default TickerDetail
