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
        <form 
            onSubmit={submitHandler}
            style={{
                margin:'0 auto',
                width:'fit-content',
                padding:'10px',
            }}
        >
                <label className='ms-2'>Symbol&nbsp;
                    <input className='form-control-sm' type="text" value={newTicker} onChange={e=>setNewTicker(e.target.value.toUpperCase())}/>
                </label>
                <label className='ms-2'>From &nbsp;
                    <input className='form-control-sm' type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
                </label>
                <label className='ms-2'>To &nbsp;
                    <input className='form-control-sm' type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
                </label>
                <label className='ms-2'>Intervals&nbsp;
                    <select className='form-select-sm' value={intervalLength} onChange={e=>setIntervalLength(e.target.value)}>
                        <option value='minute'>Minunte</option>
                        <option value='hour'>Hour</option>
                        <option value='day'>Day</option>
                        <option value='week'>Week</option>
                        <option value='month'>Month</option>
                    </select>
                    <input className='form-control-sm' type="number" style={{width:"80px"}} value={intervalMulti} onChange={e=>setIntervalMulti(e.target.value)}/>
                </label>&nbsp;&nbsp;
                <button className='btn btn-secondary btn-sm'>Search</button>
            </form>
    )
}

export default TickerSearchForm