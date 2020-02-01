import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { ResponsiveContainer } from '../utils/Responsive'
import { updateUserProfile } from '../store/actions/user'

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

const UpdateProfile = ({ history, updateUserProfile }) => {
  const [form, setForm] = useState({
    street: '',
    postalCode: '',
    city: '',
    phone: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    updateUserProfile(form, history)
  }

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const classes = useStyles()

  return (
    <section>
      <ResponsiveContainer>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h4" className={classes.headline}>
            Update delivery address
          </Typography>
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
            color="primary"
            type="submit"
            variant="contained"
          >
            Update information
          </Button>
        </form>
      </ResponsiveContainer>
    </section>
  )
}

export default connect(null, { updateUserProfile })(UpdateProfile)
