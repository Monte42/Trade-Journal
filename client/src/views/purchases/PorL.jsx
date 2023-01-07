import React from 'react'

const PorL = ({beatPrice,pnl}) => {
    return (
        <>
            {pnl>beatPrice? <span style={{color:'green'}}>{pnl}</span>:<span style={{color:'red'}}>{pnl}</span>}
        </>
    )
}

export default PorL