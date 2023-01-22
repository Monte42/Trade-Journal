const HomeChat = () => {
    const openChatWindow = (roomURL) => {
        window.open(`${roomURL}`,'ChatRoom','resizable,height=600,width=420')
        return false
    }
    return (
        <div style={{
            marginBottom:'20px',
            width:'80%',
            backgroundColor:"#444",
            borderRadius:'10px',
            boxShadow:'2px 3px 5px #222',
        }}>
            <h3 className='header-style'>Popular Chat Rooms</h3>
            <ul className='list-group mx-4 mb-2'>
                <li className='flex-wrapper flex-justify-between list-group-item list-group-item-action'>Day Trading Discussions 
                    <a href='#' onClick={e => openChatWindow('chat/Day_Trading')}>Open Chat</a>
                </li>
                <li className='flex-wrapper flex-justify-between list-group-item list-group-item-action'>Swing Trading Discussions 
                    <a href='#' onClick={e => openChatWindow('chat/Swing_Trading')}>Open Chat</a>
                </li>
                <li className='flex-wrapper flex-justify-between list-group-item list-group-item-action'>Long Term Discussions 
                    <a href='#' onClick={e => openChatWindow('chat/Long_Term')}>Open Chat</a>
                </li>
            </ul>
        </div>
    )
}

export default HomeChat