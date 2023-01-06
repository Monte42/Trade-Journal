import { useState,useContext } from 'react'
import { JournalContext } from '../../../App'

const TickerSearchForm = ({ticker,setTicker,setChartURL}) => {
    const [,,time] = useContext(JournalContext)
    const [newTicker,setNewTicker] = useState(ticker)
    const [startDate,setStartDate] = useState('2022-12-29')
    const [endDate,setEndDate] = useState(`${time.getFullYear()}-${(`0${time.getMonth()+1}`).slice(-2)}-${(`0${time.getDate()}`).slice(-2)}`)
    const [intervalLength,setIntervalLength] = useState('minute')
    const [intervalMulti,setIntervalMulti] = useState('15')
    


    const submitHandler = e => {
        e.preventDefault()
        setTicker(newTicker)
        setChartURL(`https://api.polygon.io/v2/aggs/ticker/${newTicker}/range/${intervalMulti}/${intervalLength}/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=`)
    }

    return (
        <form onSubmit={submitHandler}>
                <label>Symbol <input type="text" value={newTicker} onChange={e=>setNewTicker(e.target.value.toUpperCase())}/></label>
                <label>From <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} /></label>
                <label>To <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} /></label>
                <label>Intervals
                    <select value={intervalLength} onChange={e=>setIntervalLength(e.target.value)}>
                        <option value='minute'>Minunte</option>
                        <option value='hour'>Hour</option>
                        <option value='day'>Day</option>
                        <option value='week'>Week</option>
                        <option value='month'>Month</option>
                    </select>
                    <input type="number" style={{width:"50px"}} value={intervalMulti} onChange={e=>setIntervalMulti(e.target.value)}/>
                </label>
                <label></label>
                <button>Search</button>
            </form>
    )
}

export default TickerSearchForm