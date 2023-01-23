import { useState,useEffect } from 'react'
import env from 'react-dotenv'
import axios from 'axios'

const CashFlow = ({ticker}) => {
    const [cashFlowData,setCashFlowData] = useState({})

    useEffect(() => {
        axios.get(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker}&apikey=${env.MARKET_API}`)
            .then(res=>setCashFlowData(res.data.quarterlyReports[0]))
            .catch(err=>console.log(err))
    },[ticker])

    return (
        <div style={{backgroundColor:'#777', padding:'10px 0 30px'}}>
            <h3 className='header-style ms-2'>Cash Flow {ticker}</h3>
            <h4 className='header-style ms-2'>Fiscal Ending Date: {cashFlowData.fiscalDateEnding}</h4>
            <div className='row purchaseCard' style={{width:'90%',margin:'0 auto'}}>
                <div className='col-10 col-sm-6'>
                    <p><span className='header-style'>Capital Expenditures:</span> ${cashFlowData.capitalExpenditures}</p>
                    <p><span className='header-style'>Cash Flow from financing:</span> ${cashFlowData.cashflowFromFinancing}</p>
                    <p><span className='header-style'>Cash Flow from Investments:</span> ${cashFlowData.cashflowFromInvestment}</p>
                    <p><span className='header-style'>Divdend Payouts:</span> {cashFlowData.dividendPayout}</p>
                    <p><span className='header-style'>Net Income:</span> ${cashFlowData.netIncome}</p>
                    <p><span className='header-style'>Operating Cash Flow:</span> ${cashFlowData.operatingCashflow}</p>
                    <p><span className='header-style'>Profit/Loss:</span> ${cashFlowData.profitLoss}</p>
                </div>
                <div className='col-10 col-sm-6'>
                    <p><span className='header-style'>Change in Cash & Cash Equivalent:</span> ${cashFlowData.changeInCashAndCashEquivalents}</p>
                    <p><span className='header-style'>Change in inventory:</span> ${cashFlowData.changeInInventory}</p>
                    <p><span className='header-style'>Change in Operation Assets:</span> ${cashFlowData.changeInOperatingAssets}</p>
                    <p><span className='header-style'>Change in Operation Liabilities:</span> ${cashFlowData.changeInOperatingLiabilities}</p>
                    <p><span className='header-style'>Change in Receivables:</span> ${cashFlowData.changeInReceivables}</p>
                </div>
            </div>
        </div>
    )
}

export default CashFlow