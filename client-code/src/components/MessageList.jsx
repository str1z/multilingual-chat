import React from "react"
import List from "@material-ui/core/List"
import MessageItem from "./MessageItem"

export default ({ messages, language }) => {
  return (
    <List style={{ marginBottom: 50 }}>
      {messages.map(({ identity, message }) => (
        <MessageItem
          identity={identity}
          message={message}
          language={language}
        ></MessageItem>
      ))}
    </List>
  )
}
