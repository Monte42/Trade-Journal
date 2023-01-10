const PorL = (pnl) => {
    return (
        <>
            {pnl.pnl>=0? <td style={{textAlign:'center',color:'green'}}>${pnl.pnl}</td>:<td style={{textAlign:'center',color:'red'}}>${pnl.pnl}</td>}
        </>
    )
}

export default PorL