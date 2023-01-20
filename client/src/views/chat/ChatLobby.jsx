import { useContext } from "react"
import { Link } from "react-router-dom"
import { JournalContext } from "../../App"
import Footer from "../../components/general/Footer"
import TraderNav from "../../components/general/TraderNav"

const ChatLobby = () => {
    const [user] = useContext(JournalContext)

    return (
        <div>
            <TraderNav message={`Chat Lobby, ${user.name}`} />
            <div className='container mt-2'>
                <div className='container bg-light py-3'>
                    <h1>Chat Lobby</h1>
                    <h2>Which room would you like to join?</h2>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Day_Trade'} target='_blank'>Day Trade</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Swing_Trade'} target='_blank'>Swing Trade</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Long_Term'} target='_blank'>Long Term</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Energy'} target='_blank'>Energy</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Material'} target='_blank'>Material</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Industrials'} target='_blank'>Industrials</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Consumer_Discretionary'} target='_blank'>Consumer Discretionary</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Consumer_Discretionary'} target='_blank'>Consumer Discretionary</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Health_Care'} target='_blank'>Health Care</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Information_Technology'} target='_blank'>Information Technology</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Telecommunication_Services'} target='_blank'>Telecommunication Services</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Utilities'} target='_blank'>Utilities</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/Real_Estate'} target='_blank'>Real Estate</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChatLobby