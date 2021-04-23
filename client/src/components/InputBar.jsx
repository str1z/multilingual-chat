import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SendIcon from "@material-ui/icons/Send"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    bottom: 10,
    left: 10,
    right: 10,
    position: "fixed",
    paddingLeft: 5,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}))

export default ({ identity, sendMessage }) => {
  const classes = useStyles()
  const [message, setMessage] = useState("")
  const handleSumit = async e => {
    e.preventDefault()
    const data = await sendMessage(message)
    if (data.success) setMessage("")
  }
  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmitCapture={handleSumit}
    >
      <InputBase
        className={classes.input}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={`Send message as ${identity}`}
      />
      <IconButton className={classes.iconButton} onClick={handleSumit}>
        <SendIcon />
      </IconButton>
    </Paper>
  )
}
