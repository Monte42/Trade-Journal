import { useState,useEffect,useContext } from 'react'
import { JournalContext } from '../../App'
import { useNavigate } from "react-router-dom"
import { get_equity_value,getDiversity,get_pnl,buildUserHistoryChartData } from '../../utils/getChartData'
import axios from 'axios'
import TraderNav from '../../components/general/TraderNav'
import CreateEditPortfolio from '../../components/users/Portfolio/CreateEditPortfolio'
import Purchases from '../../components/users/Portfolio/Purchases'
import Equities from '../../components/users/Portfolio/Equities'
import DiversityChart from '../../components/users/Portfolio/DiversityChart'
import PnlChart from '../../components/users/Portfolio/PnlChart'
import BalanceTrackChart from '../../components/users/Portfolio/BalanceTrackChart'
import DeleteBtn from '../../components/general/DeleteBtn'

const UserPortfolio = () => {
    const [user,setUser] = useContext(JournalContext)
    const [portfolio,setPortfolio] = useState({})
    const [purchases,setPurchases] = useState([])
    const [equities,setEquities] = useState([])
    const [userEquityValue,setUserEquityValue]= useState(0)
    const [pnl,setPnl] = useState([])
    const [diversity,setDiversity] = useState([])
    const [balanceTrack,setBalanceTrack] = useState([])
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
            .catch(err=>console.log(err))
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
                alert(`Successfully Withdrew $${portfolio.balance-newBalance} \n New Balance: $${newBalance}`)
            })
            .catch(err=>console.log(err))
    }

    return (
        <div>
            <TraderNav message={user.name} />
            {!portfolio.account_number ? <CreateEditPortfolio submitProp={createNewPortfolio} title={<h2>Start a New Journal</h2>} /> :
                <>
                    <div className='row mx-2'>
                        <h4>Account</h4>
                        <div className='col-10 col-sm-6 p-3'>
                            <p>Account # {portfolio.account_number}</p>
                            <p>Buying Power: ${portfolio.balance}</p>
                            <p>Equity Value: ${userEquityValue}</p>
                            <p>Total Value: ${portfolio.balance+userEquityValue}</p>
                        </div>
                        <div className='col-10 col-sm-6 p-3'>
                            <p>Full Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                            <p>Year Started: {user.created_at.slice(0,4)}</p>
                        </div>
                    </div>

                    <div className='row mx-2'>
                        <div className='col-10 col-md-8 p-3'>
                            <DiversityChart diversityData={diversity}/>
                        </div>
                        <Equities portfolioID={portfolio.id} equities={equities} setEquities={setEquities} />
                    </div>
                    <div className='row mx-2'>
                        <Purchases portfolioID={portfolio.id} purchases={purchases} setPurchases={setPurchases} />
                        <div className='col-10 col-md-8 p-3'>
                            <PnlChart pnlData={pnl} />
                        </div>
                    </div>
                    <div>
                        <h4>Last 25 trades</h4>
                        {balanceTrack.length >0 ? <BalanceTrackChart balanceData={balanceTrack} />:<p>Loading</p>}
                    </div>
                    <CreateEditPortfolio submitProp={updatePortfolio} title={<h4>Withdraw/Deposit</h4>} />
                    <DeleteBtn 
                        docModel={"portfolios"}
                        docId={portfolio.id}
                        event={deletePortfolio}
                        title={'Delete Portfolio'}
                    />
                </>
            }
            <DeleteBtn 
                docModel={"users"}
                docId={user.id}
                event={deleteUser}
                title={'Delete My Account'}
            />
        </div>
    )
}

export default UserPortfolio