
const TickerForm = ({ticker, setTicker, submitProp}) => {

    const submitHandler = e => {
        e.preventDefault()
        submitProp()
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="input-group input-group-lg">
                <span onClick={submitHandler} className="input-group-text" id="inputGroup-sizing-lg">Send</span>
                <input type="text" className="form-control" aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-lg" value={ticker} 
                onChange={e => setTicker(e.target.value.toUpperCase())}
                />
            </div>
        </form>
    )
}

export default TickerForm