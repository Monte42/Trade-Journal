import Footer from "../../components/general/Footer"
import TraderNav from "../../components/general/TraderNav"

const ChatLobby = () => {

    const openChatWindow = (roomURL) => {
        window.open(`${roomURL}`,'ChatRoom','resizable,height=600,width=420')
        return false
    }

    return (
        <div>
            <TraderNav message={`Chat Lobby`} />
            <div className='container mt-2'>
                <div className='container bg-light py-3'>
                    <h1>Chat Lobby</h1>
                    <h2>Which room would you like to join?</h2>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Day_Trading')}>Day Trading</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Swing_Trading')}>Swing Trading</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Long_Term')}>Long Term</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Energy')}>Energy</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Material')}>Material</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Industrials')}>Industrials</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Consumer_Discretionary')}>Consumer Discretionary</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Consumer_Staples')}>Consumer Staple</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Health_Care')}>Health Care</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Information_Technology')}>Information Technology</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Telecommunication_Services')}>Telecommunication Services</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Utilities')}>Utilities</a>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <a href='#' onClick={e => openChatWindow('chat/Real_Estate')}>Real Estate</a>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChatLobby