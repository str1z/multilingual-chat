import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import FingerprintIcon from "@material-ui/icons/Fingerprint"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import DialogButton from "./DialogButton"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
import { Typography } from "@material-ui/core"
import LanguageIcon from "@material-ui/icons/Language"

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    position: "sticky",
    top: 10,
    left: 10,
    zIndex: 100,
  },
}))

export default ({
  toggleThemeHandler,
  identity,
  setIdentity,
  room,
  setRoom,
  language,
  setLanguage,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <DialogButton
        data={room}
        setData={setRoom}
        title="Change Room"
        description="Change chatting room by entering the room ID, if the room does not exist, a new room will be created for you."
        label="Room ID"
      >
        <MeetingRoomIcon />
      </DialogButton>
      <DialogButton
        data={identity}
        setData={setIdentity}
        title="Change Identity"
        description="Change your identity/name in this room to help others recognize you."
        label="Identity"
      >
        <FingerprintIcon />
      </DialogButton>

      <DialogButton
        data={language}
        setData={setLanguage}
        title="Change Language"
        description="Change the target translation language so that you can quickly understand what other people write in a language you are not familliar with."
        label="Language Code"
      >
        <LanguageIcon></LanguageIcon>
      </DialogButton>

      <IconButton className={classes.iconButton} onClick={toggleThemeHandler}>
        <Brightness4Icon />
      </IconButton>
      <Divider
        orientation="vertical"
        style={{ height: 25, margin: 10 }}
      ></Divider>
      <Typography variant="button" style={{ marginRight: 15 }}>
        {room ? room : "You are not in a room"}
      </Typography>
    </Paper>
  )
}
