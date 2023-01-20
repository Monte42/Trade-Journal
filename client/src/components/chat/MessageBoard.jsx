import Message from './Message'

const MessageBoard = ({msgs, user}) => {
    return (
        <div className='msg-board mt-3'>
            {msgs &&
                msgs.map((msg,i) => <Message key={i} msg={msg} i={i} user={user} />)
            }
            <p id="msg-btm" className='mt-5'></p>
        </div>
    )
}

export default MessageBoard