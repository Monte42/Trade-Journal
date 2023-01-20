import { useState,useEffect,useContext } from "react"
import { JournalContext } from "../../App"
import TraderNav from "../../components/general/TraderNav"
import io from 'socket.io-client'
import MessageBoard from "../../components/chat/MessageBoard"
import { useParams } from "react-router-dom"
import Footer from "../../components/general/Footer"

const ChatRoom = () => {
    const [socket] = useState(() => io(':5000'))
    const [user] = useContext(JournalContext)
    const {room} = useParams()
    const [msg,setMsg] = useState('')
    const [msgs,setMsgs] = useState([])


    useEffect(() => {
        const el = document.getElementById("msg-btm")
        el.scrollIntoView()
    },[msgs])

    useEffect(() => {
        socket.on("msg_from_server", data => {
            setMsgs(prevMsgs => [...prevMsgs, data])
        })
        socket.emit('join-room', room)
        return () => socket.disconnect(true)
    },[])

    const submitHandler = e => {
        e.preventDefault()
        const newMsg = {
            from: `${user.username}`,
            message: msg
        }
        socket.emit("msg_from_client", newMsg, room)
        setMsgs([...msgs,newMsg])
        setMsg("")
    }


    return (
        <div>
            <TraderNav message={`Chat Lobby, ${user.name}`} />

            <h3 className="header-style ms-5 mt-3">{room.replace('_',' ')} Discussions</h3>
            <MessageBoard msgs={msgs} user={user} />

            <form className="msg-form mb-5" onSubmit={submitHandler}>
                <div className="input-group input-group-lg">
                    <span onClick={submitHandler} className="input-group-text" id="inputGroup-sizing-lg">Send</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-lg" value={msg} 
                    onChange={e => setMsg(e.target.value)}
                    />
                    <br />
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default ChatRoom