import { useState,useEffect,useContext } from "react"
import { JournalContext } from "../../../App"
import axios from "axios"

const HomePortfolio = () => {
    const [user] = useContext(JournalContext)
    const [portfolio,setPortfolio] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/portfolios/user/${user.id}`)
            .then(res => setPortfolio(res.data))
            .catch(err => console.log(err))
    },[])


    return (
        <div 
            className="row p-2 rounded"
            style={{
                color:'#eee',
                backgroundColor:'#777',
                boxShadow:'3px 3px 5px #444'
            }}
        >
            <h4 className="header-style">User Info</h4>
            <div className="col-10 col-sm-6">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="col-10 col-sm-6">
                <p><strong>Account#</strong> {portfolio.account_number}</p>
                <p><strong>Buying Power:</strong> ${portfolio.balance}</p>
                <p><strong>Create Date:</strong> {new Date(portfolio.created_at).toDateString()}</p>
            </div>
        </div>
    )
}

export default HomePortfolio