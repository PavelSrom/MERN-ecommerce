import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { saveGuestInfo } from '../../store/actions/user'
import {
  Paper,
  TextField,
  Button,
  IconButton,
  Tooltip,
  makeStyles
} from '@material-ui/core'
import { Subheadline } from '../../utils/Responsive'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 576,
    padding: 16,
    display: 'block',
    margin: '0 auto'
  }
}))

const DeliveryInfo = ({ inc, isAuthenticated, saveGuestInfo }) => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    postalCode: '',
    city: '',
    phone: ''
  })
  const [labels] = useState({
    email: 'Email',
    firstName: 'First name',
    lastName: 'Last name',
    street: 'Street',
    postalCode: 'Postal code',
    city: 'City',
    phone: 'Phone'
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  if (isAuthenticated) inc(2)
  const invalidForm = Object.values(form).some(val => !val)
  const classes = useStyles()

  return isAuthenticated ? null : (
    <Fragment>
      <Tooltip title="Go back" placement="top">
        <IconButton onClick={() => inc(0)}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Paper className={classes.paper}>
        <Subheadline center gutterBottom>
          Delivery information
        </Subheadline>
        <div>
          {Object.keys(form).map(item => (
            <TextField
              key={item}
              name={item}
              value={form[item]}
              label={labels[item]}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: 16 }}
            />
          ))}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                inc(2)
                saveGuestInfo(form)
              }}
              disabled={invalidForm}
            >
              Continue
            </Button>
          </div>
        </div>
      </Paper>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { saveGuestInfo })(DeliveryInfo)
