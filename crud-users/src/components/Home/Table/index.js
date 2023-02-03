import React from 'react'
import API from '../../../services/API'
import { withStyles } from '@material-ui/core/styles'
import { Container } from './styles'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import UserDialog from '../Form/UserDialog'
import swal from 'sweetalert'
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: { fontSize: 14 }
}))(TableCell)
const StyledTableRow = withStyles((theme) => ({
  root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }
}))(TableRow)
const UserTable = ({ getUsers, users, deleteUser }) => {
  return (
    <Container>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell>CPF</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead><TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component='th' scope='row'>
                  {user.cpf}
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  <UserDialog 
                    isEditing={true}
                    icon={<EditIcon />}
                    user={user}
                    getUsers={getUsers}
                  /><Button
                    variant='contained'
                    style={{ backgroundColor: '#9a0036', color: '#fff' }}
                    size='small'
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      swal({
                        title: 'Are you sure?',
                        text: 'Once deleted, you will not be able to recover this!',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                          API.delete(`/users/${user.id}`)
                            .then((res) => { getUsers() })
                            .catch((err) => { console.log(err) })
                          
                          swal('The user has been deleted!', {
                            icon: 'success'
                          })
                        }
                      })
                    }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell component='th' scope='row' colSpan={3}>
                No users
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  )
}
export default UserTable