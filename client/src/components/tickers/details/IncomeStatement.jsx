import { useState,useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

const IncomeStatement = ({ticker}) => {
    const [incomeData,setIncomeData] = useState([])

    useEffect(()=>{
        axios.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${env.MARKET_API}`)
            .then(res=>setIncomeData(res.data.quarterlyReports[0]))
            .catch(err=>console.log(err))
    },[ticker])

    return (
        <div>
            <h3>Income Statement {ticker}</h3>
            <h4>Fiscal Ending Date: {incomeData.fiscalDateEnding}</h4>
            <div className='row'>
                <div className='col-10 col-sm-6'>
                    <p>Gross Profit: {incomeData.grossProfit}</p>
                    <p>Net Income: {incomeData.netIncome}</p>
                    <p>Pre Tax Income: {incomeData.incomeBeforeTax}</p>
                    <p>Income Tax Expense: {incomeData.incomeTaxExpense}</p>
                </div>
                <div className='col-10 col-sm-6'>
                    <p>Cost of Production: {incomeData.costofGoodsAndServicesSold}</p>
                    <p>Operation Expense: {incomeData.operatingExpenses}</p>
                    <p>Operation Income: {incomeData.operatingIncome}</p>
                    <p>Total Revenue: {incomeData.totalRevenue}</p>
                </div>
            </div>
        </div>
    )
}

export default IncomeStatement