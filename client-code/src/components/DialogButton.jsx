import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"

export default ({ children, title, description, label, data, setData }) => {
  const [open, setOpen] = useState(false)
  const [currentData, setCurrentData] = useState(data)
  const handleClickOpen = () => setOpen(true)
  const handleCancel = () => {
    setCurrentData(data)
    setOpen(false)
  }
  const handleChange = () => {
    setData(currentData)
    setOpen(false)
  }
  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>{children}</IconButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            label={label}
            value={currentData}
            onChange={e => setCurrentData(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleChange}>Change</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
