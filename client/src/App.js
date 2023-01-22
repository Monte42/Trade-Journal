import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserAuth from './views/user_auth/UserAuth';
import Home from './views/Home';
import EditUser from './views/users/EditUser';
import PrivateRoutes from './utils/PrivateRoutes';
import UserPortfolio from './views/users/UserPortfolio';
import TickerDetail from './views/ticker/TickerDetail';
import NewPurchase from './views/purchases/NewPurchase';
import EditPurchase from './views/purchases/EditPurchase';
import DetailsPurchase from './views/purchases/DetailsPurchase';
import EditEquity from './views/equities/EditEquity';
import ChatLobby from './views/chat/ChatLobby';
import ChatRoom from './views/chat/ChatRoom';

export const JournalContext = React.createContext()

const persistData = JSON.parse(localStorage.getItem("user") || null)

function App() {
  const [user,setUser] = useState(persistData)
  const [time,setTime] = useState(new Date())

  useEffect(() => { // This is the logic for the clock 
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => {
          clearInterval(interval);
      };
  }, []);
  
  useEffect(() => {
      localStorage.setItem("user", JSON.stringify(user))
  },[user])

  return (
    <JournalContext.Provider value={[user,setUser,time]}>
      <main className="App"  id='main'>
        <BrowserRouter>
          <Routes>
            <Route element={<UserAuth />} path={'/register'} />
            <Route element={<PrivateRoutes/>}>
              <Route element={<Home />} path={'/'} />
              <Route element={<EditUser />} path={'/user/:id/edit'} />
              <Route element={<UserPortfolio />} path={'/:username/portfolio'} />
              <Route element={<TickerDetail />} path={'/details'} />
              <Route element={<DetailsPurchase />} path={'/purchases/:id'} />
              <Route element={<NewPurchase />} path={'/purchases/:id/new'} />
              <Route element={<EditPurchase />} path={'/purchases/:portID/:purchID/edit'} />
              <Route element={<EditEquity />} path={'/equities/:id'} />
              <Route element={<ChatLobby />} path={'/chat_lobby'} />
              <Route element={<ChatRoom />} path={'/chat/:room'} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </JournalContext.Provider>
  );
}

export default App;
