import { useState,useEffect } from 'react'

const Message = ({msg,user}) => {
    const [msgStyle,setMsgStyle] = useState('')

    useEffect(() => {
        msg.from === user.username ? setMsgStyle('msg out') : setMsgStyle('msg in')
    },[])

    return (
        <div className={msgStyle}>
            <h6 className='header-style'>{msg.from}</h6>
            <p>{msg.message}</p>
        </div>
    )
}

export default Message