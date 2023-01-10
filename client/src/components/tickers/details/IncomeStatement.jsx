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
        <div style={{backgroundColor:'#777', padding:'10px 0 30px'}}>
            <h3 className='header-style ms-2'>Income Statement {ticker}</h3>
            <h4 className='header-style ms-2'>Fiscal Ending Date: {incomeData.fiscalDateEnding}</h4>
            <div className='row purchaseCard' style={{width:'90%', margin:'0 auto'}}>
                <div className='col-10 col-sm-6'>
                    <p><span className='header-style'>Gross Profit:</span> ${incomeData.grossProfit}</p>
                    <p><span className='header-style'>Net Income:</span> ${incomeData.netIncome}</p>
                    <p><span className='header-style'>Pre Tax Income:</span> ${incomeData.incomeBeforeTax}</p>
                    <p><span className='header-style'>Income Tax Expense:</span> ${incomeData.incomeTaxExpense}</p>
                </div>
                <div className='col-10 col-sm-6'>
                    <p><span className='header-style'>Cost of Production:</span> ${incomeData.costofGoodsAndServicesSold}</p>
                    <p><span className='header-style'>Operation Expense:</span> ${incomeData.operatingExpenses}</p>
                    <p><span className='header-style'>Operation Income:</span> ${incomeData.operatingIncome}</p>
                    <p><span className='header-style'>Total Revenue:</span> ${incomeData.totalRevenue}</p>
                </div>
            </div>
        </div>
    )
}

export default IncomeStatement