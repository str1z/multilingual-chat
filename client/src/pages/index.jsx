import React, { useState, useEffect } from "react"
import InputBar from "../components/InputBar"
import MenuBar from "../components/MenuBar"
import "../styles/style.css"
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import darkTheme from "../theme/dark"
import lightTheme from "../theme/light"
import CssBaseline from "@material-ui/core/CssBaseline"
import MessageList from "../components/MessageList"

const global = {}

const IndexPage = () => {
  const [theme, setTheme] = useState(darkTheme)
  const [identity, setIdentity] = useState("Anonymous")
  const [room, setRoom] = useState("main")
  const [language, setLanguage] = useState("en")
  const [messages, setMessages] = useState([])
  const toggleThemeHandler = () => {
    if (theme == darkTheme) setTheme(lightTheme)
    else setTheme(darkTheme)
  }

  global.room = room
  global.messages = messages

  const watchRoom = async () => {
    const response = await fetch("/watch?room=" + encodeURI(global.room))
    if (response.status === 200) {
      const data = await response.json()
      const { identity, message } = data
      if (identity && message) {
        const newMessages = global.messages.concat([{ identity, message }])
        setMessages(newMessages)
        scrollTo(0, document.body.scrollHeight)
      }
    }
    await watchRoom()
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      setRoom(hash)
      global.room = hash
    }
    watchRoom()
  }, [])

  const sendMessage = async message => {
    const response = await fetch("/send?room=" + encodeURI(room), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, identity }),
    })
    return await response.json()
  }

  const changeRoom = async newRoom => {
    if (newRoom == room) return
    await sendMessage("Goodbye everyone!")
    setRoom(newRoom)
    window.location.hash = newRoom
  }

  useEffect(() => {
    setMessages([])
    sendMessage("Hello everyone!")
  }, [room])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <MenuBar
        toggleThemeHandler={toggleThemeHandler}
        identity={identity}
        setIdentity={setIdentity}
        room={room}
        setRoom={changeRoom}
        language={language}
        setLanguage={setLanguage}
      ></MenuBar>
      <MessageList messages={messages} language={language}></MessageList>
      <InputBar
        identity={identity}
        room={room}
        sendMessage={sendMessage}
      ></InputBar>
    </ThemeProvider>
  )
}

export default IndexPage
