import { useState,useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

const CashFlow = ({ticker}) => {
    const [cashFlowData,setCashFlowData] = useState({})

    useEffect(() => {
        axios.get(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker}&apikey=${env.MARKET_API}`)
            .then(res=>setCashFlowData(res.data.quarterlyReports[0]))
            .catch(err=>console.log(err))
    },[ticker])

    return (
        <div>
            <h3>Cash Flow {ticker}</h3>
            <h4>Fiscal Ending Date: {cashFlowData.fiscalDateEnding}</h4>
            <div className='row'>
                <div className='col-10 col-sm-6'>
                    <p>Capital Expenditures: ${cashFlowData.capitalExpenditures}</p>
                    <p>Cash Flow from financing: ${cashFlowData.cashflowFromFinancing}</p>
                    <p>Cash Flow from Investments: ${cashFlowData.cashflowFromInvestment}</p>
                    <p>Divdend Payouts: {cashFlowData.dividendPayout}</p>
                    <p>Net Income: ${cashFlowData.netIncome}</p>
                    <p>Operating Cash Flow: ${cashFlowData.operatingCashflow}</p>
                    <p>Profit/Loss: ${cashFlowData.profitLoss}</p>
                </div>
                <div className='col-10 col-sm-6'>
                    <p>Change in Cash & Cash Equivalent: ${cashFlowData.changeInCashAndCashEquivalents}</p>
                    <p>Change in inventory: ${cashFlowData.changeInInventory}</p>
                    <p>Change in Operation Assets: ${cashFlowData.changeInOperatingAssets}</p>
                    <p>Change in Operation Liabilities: ${cashFlowData.changeInOperatingLiabilities}</p>
                    <p>Change in Receivables: ${cashFlowData.changeInReceivables}</p>
                </div>
            </div>
        </div>
    )
}

export default CashFlow