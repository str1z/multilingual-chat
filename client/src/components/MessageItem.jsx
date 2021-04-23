import React, { useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { Paper, Typography } from "@material-ui/core"
import TranslateIcon from "@material-ui/icons/Translate"
import IconButton from "@material-ui/core/IconButton"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"

export default ({ identity, message, language }) => {
  const [translation, setTranslation] = useState("")
  const [success, setSuccess] = useState(false)
  const translateMessage = async () => {
    if (success) return
    const response = await fetch(
      `/translate?lang=${encodeURI(language)}&text=${encodeURI(message)}`
    )
    const data = await response.json()
    const translated = data.success
    if (translated) {
      setTranslation(translated)
      setSuccess(true)
    } else setTranslation("Failed to translate.")
  }
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography>
            {identity}{" "}
            <IconButton size="small" onClick={translateMessage}>
              <TranslateIcon fontSize="small"></TranslateIcon>
            </IconButton>
          </Typography>
        }
        secondary={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Paper style={{ padding: 10, display: "inline-block" }}>
              {message}
            </Paper>
            {translation ? (
              <React.Fragment>
                <ArrowForwardIcon style={{ margin: 10 }}></ArrowForwardIcon>
                <Paper style={{ padding: 10, display: "inline-block" }}>
                  {translation}
                </Paper>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        }
      />
    </ListItem>
  )
}
