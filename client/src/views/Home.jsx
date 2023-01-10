import { useContext } from 'react'
import { JournalContext } from '../App'
import TraderNav from '../components/general/TraderNav'
import TickerStats from '../components/tickers/homePage/TickerStats'
import TickerNews from '../components/tickers/homePage/TickerNews'
import HomeChat from '../components/chat/HomeChat'
import HomePortfolio from '../components/users/homePage/HomePortfolio'
import Footer from '../components/general/Footer'

const Home = () => {
    const [user] = useContext(JournalContext)


    return (
        <div>
            <TraderNav message={`Welcome, ${user.name}`} />
            <div className='row d-flex justify-content-center py-3 '>
                <div className='col-md-10 col-lg-6 flex-wrapper flex-col flex-align-center' style={{height:"75vh"}}>
                    <TickerStats />
                    <HomeChat />
                </div>
                <div className='col-md-10 col-lg-6 flex-wrapper flex-col flex-align-center' style={{height:"75vh"}}>
                    <HomePortfolio />
                    <TickerNews />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home