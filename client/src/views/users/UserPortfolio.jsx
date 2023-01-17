import { useState,useEffect,useContext } from 'react'
import { JournalContext } from '../../App'
import { useNavigate } from "react-router-dom"
import { get_equity_value,getDiversity,get_pnl,buildUserHistoryChartData } from '../../utils/getChartData'
import TraderNav from '../../components/general/TraderNav'
import CreateEditPortfolio from '../../components/users/Portfolio/CreateEditPortfolio'
import Purchases from '../../components/users/Portfolio/Purchases'
import Equities from '../../components/users/Portfolio/Equities'
import DiversityChart from '../../components/users/Portfolio/DiversityChart'
import PnlChart from '../../components/users/Portfolio/PnlChart'
import BalanceTrackChart from '../../components/users/Portfolio/BalanceTrackChart'
import DeleteBtn from '../../components/general/DeleteBtn'
import Footer from '../../components/general/Footer'
import axios from 'axios'

const UserPortfolio = () => {
    const [user,setUser] = useContext(JournalContext)
    const [portfolio,setPortfolio] = useState({})
    const [purchases,setPurchases] = useState([])
    const [equities,setEquities] = useState([])
    const [userEquityValue,setUserEquityValue]= useState(0)
    const [pnl,setPnl] = useState([])
    const [diversity,setDiversity] = useState([])
    const [balanceTrack,setBalanceTrack] = useState([])
    const [error,setError] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/portfolios/user/${user.id}`)
            .then(res => setPortfolio(res.data))
            .catch(err => console.log(err))
    },[])
    useEffect(()=>{
        setUserEquityValue(get_equity_value(equities))
        setDiversity(getDiversity(equities,portfolio.balance))
    },[equities])
    useEffect(()=>{
        setPnl(get_pnl(purchases))
        setBalanceTrack(buildUserHistoryChartData())
    },[purchases])

    const deletePortfolio = () => {
        navigate('/')
    }
    const deleteUser = () => {
        setUser(null)
        navigate('/register')
    }
    const createNewPortfolio = startBalance => {
        axios.post('http://localhost:8000/api/portfolios', {
            user: user.id,
            balance: startBalance
        })
            .then(res=>{setPortfolio(res.data)})
            .catch(err=>setError(err.response.data))
    }
    const updatePortfolio = newBalance => {
        axios.put(`http://localhost:8000/api/portfolios/${portfolio.id}`, {
            user: user.id,
            account_number: portfolio.account_number,
            balance: newBalance
        })
            .then(res=> {
                setPortfolio(res.data)
                newBalance>portfolio.balance?
                alert(`Successfully Deposited $${newBalance-portfolio.balance} \n New Balance: $${newBalance}`):
                    portfolio.balance-newBalance<0 ?
                    alert(`Sorry, you do not have sufficient funds`):
                    alert(`Successfully Withdrew $${portfolio.balance-newBalance} \n New Balance: $${newBalance}`)
                setError({})
            })
            .catch(err=>setError(err.response.data))
    }

    return (
        <div>
            <TraderNav message={user.name} />
            {!portfolio.account_number ? 
                <>
                    <CreateEditPortfolio submitProp={createNewPortfolio} title={<h2>Start a New Journal</h2>} error={error} />
                    <br/>
                    <DeleteBtn 
                        docModel={"users"}
                        docId={user.id}
                        event={deleteUser}
                        title={'Delete My Account'}
                        leftMargin={'15vw'}
                    />
                    <Footer bottomOut={'bottom-out'} />
                </> :
                <>
                    <div 
                        className='row m-3 p-2'
                        style={{backgroundColor:'#888',color:'#fff',borderRadius:'10px',boxShadow:'2px 5px 5px #777'}}
                    >
                        <h4 className='header-style'>Account</h4>
                        <div className='col-10 col-sm-6 p-3'>
                            <p>Account # {portfolio.account_number}</p>
                            <p>Buying Power: ${parseFloat(portfolio.balance).toFixed(2)}</p>
                            <p>Equity Value: ${parseFloat(userEquityValue).toFixed(2)}</p>
                            <p>Total Value: ${(parseFloat(portfolio.balance)+parseFloat(userEquityValue)).toFixed(2)}</p>
                        </div>
                        <div className='col-10 col-sm-6 p-3'>
                            <p>Full Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                            <p>Year Started: {user.created_at.slice(0,4)}</p>
                            <DeleteBtn 
                                docModel={"users"}
                                docId={user.id}
                                event={deleteUser}
                                title={'Delete My Account'}
                                leftMargin={'0'}
                            />
                        </div>
                    </div>

                    <div className='row mx-2'>
                        <div className='col-10 col-md-7 p-3' style={{margin:'0 auto'}}>
                            <DiversityChart diversityData={diversity}/>
                        </div>
                        <Equities portfolioID={portfolio.id} equities={equities} setEquities={setEquities} />
                    </div>
                    <div className='row mx-2'>
                        <Purchases portfolioID={portfolio.id} purchases={purchases} setPurchases={setPurchases} />
                        <div className='col-10 col-md-7 p-3' style={{margin:'0 auto'}}>
                            {pnl[0].y===0&&pnl[1].y===0? 
                            <h4 className='text-center pt-5 header-style'>No Data</h4> :
                            <>
                                <h4 className="text-center pt-3 header-style">
                                    Total Profit: ${parseFloat(pnl[1].y-pnl[0].y).toFixed(2)}
                                </h4>
                                <div style={{backgroundColor:'#888', height:'55%', borderRadius:'10px',boxShadow:'5px 5px 5px #777'}}>
                                    <PnlChart pnlData={pnl} />
                                </div>
                            </>
                            }
                        </div>
                    </div>
                    <div style={{
                        backgroundColor:'#888',
                        width:'96vw',
                        margin:'0 auto',
                        borderRadius:'5px',
                        paddingLeft:'3vw'
                    }}>
                        <h4 className='header-style pt-3'>Portfolio Growth</h4>
                        {balanceTrack.length >0 ? <BalanceTrackChart balanceData={balanceTrack} />:<p>Loading</p>}
                    </div>
                    <div style={{
                        backgroundColor:'#bbb', 
                        width:'fit-content', 
                        padding:'2vh 12vw',
                        margin:'10px auto',
                        borderRadius:'10px',

                    }}>
                        <CreateEditPortfolio submitProp={updatePortfolio} title={<h4>Withdraw/Deposit</h4>} error={error} />
                        <DeleteBtn 
                            docModel={"portfolios"}
                            docId={portfolio.id}
                            event={deletePortfolio}
                            title={'Delete Portfolio'}
                            leftMargin={'40%'}
                        />
                    </div>
                    <Footer />
                </>
            }
        </div>
    )
}

export default UserPortfolio