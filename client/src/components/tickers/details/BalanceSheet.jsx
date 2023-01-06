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
        <div>
            <h3>BalanceSheet {ticker}</h3>
            <h4>Fiscal Ending Date: {sheetData.fiscalDateEnding}</h4>
            <div className='row'>
                <div className='col-10 col-sm-6'>
                    <p>Cash & Cash Equivalent: ${sheetData.cashAndCashEquivalentsAtCarryingValue}</p>
                    <p>Short Term Investments: ${sheetData.cashAndShortTermInvestments}</p>
                    <p>Shares Outstanding: {sheetData.commonStockSharesOutstanding}</p>
                    <p>Current Debt: ${sheetData.currentDebt}</p>
                    <p>Long Term Debt: ${sheetData.longTermDebt}</p>
                    <p>Current Inventory: ${sheetData.inventory}</p>
                    <p>Investments: ${sheetData.investments}</p>
                </div>
                <div className='col-10 col-sm-6'>
                    <p>Other Current Assets: ${sheetData.otherCurrentAssets}</p>
                    <p>Liquidable Assets: ${sheetData.propertyPlantEquipment}</p>
                    <p>Other Current Liabilities: ${sheetData.otherCurrentLiabilities}</p>
                    <p>Total Current Assets: ${sheetData.totalCurrentAssets}</p>
                    <p>Retained Earnings: ${sheetData.retainedEarnings}</p>
                    <p>Share Holder Equity: ${sheetData.totalShareholderEquity}</p>
                </div>
            </div>
        </div>
    )
}

export default BalanceSheet