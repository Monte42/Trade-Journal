const PorL = (pnl) => {
    return (
        <>
            {pnl.pnl>0? <td style={{color:'green'}}>{pnl.pnl}</td>:<td style={{color:'red'}}>{pnl.pnl}</td>}
        </>
    )
}

export default PorL