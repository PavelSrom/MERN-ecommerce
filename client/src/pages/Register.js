import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../store/actions/auth'
import { ResponsiveContainer } from '../utils/Responsive'
import {
  Typography,
  makeStyles,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: 600,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: theme.spacing(4)
  },
  headline: {
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  submitBtn: {
    marginTop: theme.spacing(6)
  }
}))

const Register = ({ isAuthenticated, loading, registerUser }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    street: '',
    postalCode: '',
    city: '',
    phone: ''
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    registerUser(form)
  }

  const invalidForm = Object.keys(form).some(key => {
    if (key === 'password' && form[key].length < 6) {
      return true
    }

    return !form[key].length
  })

  const classes = useStyles()

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <section>
      <ResponsiveContainer>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h4" className={classes.headline}>
            Register in the system
          </Typography>
          <TextField
            onChange={handleChange}
            name="email"
            label="Email"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            type="password"
            onChange={handleChange}
            name="password"
            label="Password"
            variant="outlined"
            className={classes.input}
            helperText="Must be at least 6 characters"
          />
          <TextField
            onChange={handleChange}
            name="firstName"
            label="First name"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            onChange={handleChange}
            name="lastName"
            label="Last name"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            onChange={handleChange}
            name="street"
            label="Street"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            onChange={handleChange}
            name="postalCode"
            label="Postal code"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            onChange={handleChange}
            name="city"
            label="City"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            onChange={handleChange}
            name="phone"
            label="Phone"
            variant="outlined"
            className={classes.input}
          />

          <Button
            className={classes.submitBtn}
            disabled={invalidForm || loading}
            color="primary"
            type="submit"
            variant="contained"
          >
            Register
          </Button>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption">
              Already registered? <Link to="/login">Log in</Link>
            </Typography>
          </div>

          {loading && (
            <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
          )}
        </form>
      </ResponsiveContainer>
    </section>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.visual.loading
})

export default connect(mapStateToProps, { registerUser })(Register)
