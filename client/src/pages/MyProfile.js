import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteAccount } from '../store/actions/auth'
import {
  Avatar,
  Typography,
  makeStyles,
  List,
  ListItem,
  Paper,
  Button
} from '@material-ui/core'
import { ResponsiveContainer, LineLength } from '../utils/Responsive'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 140,
    height: 140,
    background: theme.palette.secondary.main,
    fontSize: 60
  },
  centered: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  delivery: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  },
  delAccBtn: {
    background: theme.palette.error.main,
    marginTop: theme.spacing(2)
  }
}))

const MyProfile = ({ user, history, deleteAccount }) => {
  const nameInitials = `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`

  const handleAccountDeletion = () => {
    const isSure = window.confirm('Are you sure? This action is irreversible!')

    return isSure ? deleteAccount(history) : null
  }

  const classes = useStyles()

  return (
    <section style={{ background: '#f8f8f8' }}>
      <ResponsiveContainer>
        <div className={classes.centered}>
          <Avatar className={classes.avatar}>{nameInitials}</Avatar>
          <Typography variant="h4" style={{ marginTop: 20 }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2">VIP customer</Typography>

          <Button className={classes.delAccBtn} onClick={handleAccountDeletion}>
            Delete account
          </Button>
        </div>

        <LineLength>
          <Typography variant="h5" className={classes.delivery}>
            Delivery information
          </Typography>
          <Paper>
            <List>
              <ListItem divider className={classes.listItem}>
                <Typography variant="h6">Street</Typography>
                <Typography variant="body1">{user.address.street}</Typography>
              </ListItem>
              <ListItem divider className={classes.listItem}>
                <Typography variant="h6">Postal code</Typography>
                <Typography variant="body1">
                  {user.address.postalCode}
                </Typography>
              </ListItem>
              <ListItem divider className={classes.listItem}>
                <Typography variant="h6">City</Typography>
                <Typography variant="body1">{user.address.city}</Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body1">{user.phone}</Typography>
              </ListItem>
            </List>
          </Paper>
        </LineLength>

        <div className={classes.centered} style={{ marginTop: 56 }}>
          <Button
            component={Link}
            to="/me/update"
            color="primary"
            variant="contained"
          >
            Update delivery information
          </Button>
        </div>
      </ResponsiveContainer>
    </section>
  )
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps, { deleteAccount })(MyProfile)
