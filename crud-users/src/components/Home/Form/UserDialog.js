import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide' 
import Form from './index'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
const UserDialog = ({ getUsers, isEditing, icon, user }) => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  return (
    <div style={{ display: 'inline-block' }}>
      <Button 
        variant='contained'
        size='small'
        onClick={handleClickOpen}
        startIcon={icon}
        style={
          isEditing ? 
            {backgroundColor: '#006974', color: '#FFF'} 
            : {backgroundColor: '#4caf50', color: '#fff'}
        }
      >
        { isEditing ? 'Edit' : 'Add User' }
      </Button><Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle style={{marginBottom: -30}} id='alert-dialog-slide-title'>
          { isEditing ? 'Edit User' : 'Add User' }
        </DialogTitle><DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Form 
              handleClose={handleClose}
              getUsers={getUsers}
              user={user}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default UserDialog