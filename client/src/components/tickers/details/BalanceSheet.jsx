import { useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { useState } from 'react'

const BalanceSheet = ({ticker}) => {
    const [sheetData,setSheetData] = useState({})

    useEffect(() => {
        axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${env.MARKET_API}`)
            .then(res=>setSheetData(res.data.quarterlyReports[0]))
            .catch(err=>console.log(err))
    },[ticker])

    return (
        <div style={{padding:'10px 0 30px'}}>
            <h3 className='header-style ms-2'>BalanceSheet {ticker}</h3>
            <h4 className='header-style ms-2'>Fiscal Ending Date: {sheetData.fiscalDateEnding}</h4>
            <div className='row purchaseCard' style={{width:'90%', margin:'0 auto'}}>
                <div className='col-10 col-sm-6'>
                    <p><span className='header-style'>Cash & Cash Equivalent:</span> ${sheetData.cashAndCashEquivalentsAtCarryingValue}</p>
                    <p><span className='header-style'>Short Term Investments:</span> ${sheetData.cashAndShortTermInvestments}</p>
                    <p><span className='header-style'>Shares Outstanding:</span> {sheetData.commonStockSharesOutstanding}</p>
                    <p><span className='header-style'>Current Debt:</span> ${sheetData.currentDebt}</p>
                    <p><span className='header-style'>Long Term Debt:</span> ${sheetData.longTermDebt}</p>
                    <p><span className='header-style'>Current Inventory:</span> ${sheetData.inventory}</p>
                    <p><span className='header-style'>Investments:</span> ${sheetData.investments}</p>
                </div>
                <div className='col-10 col-sm-6'>
                    <p><span className='header-style'>Other Current Assets:</span> ${sheetData.otherCurrentAssets}</p>
                    <p><span className='header-style'>Liquidable Assets:</span> ${sheetData.propertyPlantEquipment}</p>
                    <p><span className='header-style'>Other Current Liabilities</span>: ${sheetData.otherCurrentLiabilities}</p>
                    <p><span className='header-style'>Total Current Assets:</span> ${sheetData.totalCurrentAssets}</p>
                    <p><span className='header-style'>Retained Earnings:</span> ${sheetData.retainedEarnings}</p>
                    <p><span className='header-style'>Share Holder Equity:</span> ${sheetData.totalShareholderEquity}</p>
                </div>
            </div>
        </div>
    )
}

export default BalanceSheet