import React from 'react'
import API from '../../../services/API'
import { Container } from './styles'
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CheckIcon from '@material-ui/icons/Check'
 
const UserForm = ({ user, handleClose, getUsers }) => {
  const { handleSubmit, errors } = useForm()
  const isEditing = !!user
  const onSubmit = (e) => {
    if (!isEditing) {
      let params = { cpf_cnpj: e.cpf_cnpj }
      API.post('/users', params)
        .then((res) => {
          document.getElementById('form').reset()
          handleClose()
          getUsers()
        })
        .catch((err) => { console.log(err) })
    } else {
      let params = { cpf_cnpj: e.cpf_cnpj }
      API.patch(`/users/${user.id}`, params)
        .then((res) => {
          document.getElementById('form').reset()
          handleClose()
          getUsers()
        })
        .catch((err) => { console.log(err) })
    }
  }
  return (
    <Container>
      <form id='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        {errors.cpf_cnpj && <p>{errors.cpf_cnpj.message}</p>}<br />
        <TextField
          variant='outlined'
          id='cpf'
          label='CPF'
          required
          defaultValue={isEditing ? user.cpf : ''}
        />
        {errors.cpf && <p>{errors.cpf.message}</p>}<br />
        <Button
          variant='contained'
          type='submit'
          size='small'
          id='buttonNewUser'
          startIcon={isEditing ? <CheckIcon /> : <AddCircleOutlineIcon />}
          style={
            isEditing ? 
              {backgroundColor: '#006974', color: '#FFF'} 
              : {backgroundColor: '#4caf50', color: '#fff'}
          }
        >
          {isEditing ? 'Edit' : 'Add User'}
        </Button>
      </form>
    </Container>
  )
}
export default UserForm