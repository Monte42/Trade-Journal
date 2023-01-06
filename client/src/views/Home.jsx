import { useContext } from 'react'
import { JournalContext } from '../App'
import TraderNav from '../components/general/TraderNav'
import TickerStats from '../components/tickers/homePage/TickerStats'
import TickerNews from '../components/tickers/homePage/TickerNews'

const Home = () => {
    const [user] = useContext(JournalContext)


    return (
        <div>
            <TraderNav message={`Welcome, ${user.name}`} />
            <div className='row d-flex justify-content-center py-3 '>
                <div className='col-md-10 col-lg-6 border flex-wrapper flex-col flex-align-center' style={{height:"75vh"}}>
                    <TickerStats />
                    <section className='border' style={{height:'20%', width:"95%"}}>
                        chat lobby
                    </section>
                </div>
                <div className='col-md-10 col-lg-6 border flex-wrapper flex-col flex-align-center' style={{height:"75vh"}}>
                    <section className='border' style={{height:'40%', width:"95%"}}>
                        Profile Data
                    </section>
                    <TickerNews />
                </div>
            </div>
        </div>
    )
}

export default Home