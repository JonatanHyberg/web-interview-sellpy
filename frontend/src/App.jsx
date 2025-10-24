import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { TodoLists } from './todos/components/TodoLists'
import { useEffect, useState } from 'react'

const MainAppBar = () => {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          Things to do
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const mainWrapperStyle = { display: 'flex', flexDirection: 'column' }
const centerContentWrapper = { display: 'flex', justifyContent: 'center' }
const contentWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
}
const MainWrapper = ({ children }) => {
  return (
    <div style={mainWrapperStyle}>
      <MainAppBar />
      <div style={centerContentWrapper}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  )
}

const App = () => {
  // const [messages, setMessages] = useState([]);
  // const [newMsg, setNewMsg] = useState("");

  // useEffect(() => {
  //   fetch("/api/message")
  //     .then(res => res.json())
  //     .then(setMessages)
  //     .catch(err => console.error("Error fetching", err))
  // }, []);

  // const sendMessage = async () => {
  //   if (!newMsg.trim()) return;

  //   const res = await fetch('/api/message', {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({text: newMsg}),
  //   });

  // const data = await res.json();
  // setMessages(prev => [...prev, data]);
  // setNewMsg("");
  // };


  return (
    // <div>
    //   <div>
    //     <input
    //       type = "text"
    //       value = {newMsg}
    //       placeholder = "type a message"
    //       onChange = {e => setNewMsg(e.target.value)} 
    //     />
    //     <button onClick={sendMessage}>send</button>
    //   </div>
      
    //     <ul>
    //     {messages.map(m => (
    //       <li key={m.id}>{m.text}</li>
    //     ))}
    //   </ul>

    // </div>
    <MainWrapper>
      <TodoLists style={{ margin: '1rem' }} />
    </MainWrapper>
  )
}

export default App
