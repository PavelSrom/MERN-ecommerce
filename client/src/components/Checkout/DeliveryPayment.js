import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveDelpay } from '../../store/actions/user'
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  Button,
  IconButton,
  Tooltip,
  makeStyles
} from '@material-ui/core'
import { Subheadline } from '../../utils/Responsive'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
  radioGroup: {
    maxWidth: 200,
    margin: '0 auto',
    marginBottom: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    maxWidth: 576,
    padding: 16,
    display: 'block',
    margin: '0 auto'
  }
}))

const DeliveryPayment = ({ history, inc, saveDelpay }) => {
  const [delivery, setDelivery] = useState('')
  const [payment, setPayment] = useState('')
  const classes = useStyles()

  return (
    <Fragment>
      <Tooltip title="Go back" placement="top">
        <IconButton onClick={() => history.replace('/me/cart')}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Paper className={classes.paper}>
        <Subheadline center>How would you like this delivered?</Subheadline>
        <RadioGroup
          value={delivery}
          className={classes.radioGroup}
          onChange={e => setDelivery(e.target.value)}
        >
          <FormControlLabel
            label="GLS"
            value="GLS"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            label="Amazon"
            value="Amazon"
            control={<Radio color="primary" />}
          />
        </RadioGroup>

        <Subheadline center>How would you like to pay?</Subheadline>
        <RadioGroup
          value={payment}
          className={classes.radioGroup}
          onChange={e => setPayment(e.target.value)}
        >
          <FormControlLabel
            label="Cash"
            value="Cash"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            label="VISA"
            value="VISA"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            label="MasterCard"
            value="MasterCard"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            label="PayPal"
            value="PayPal"
            control={<Radio color="primary" />}
          />
        </RadioGroup>

        <div className={classes.button}>
          <Button
            disabled={!delivery || !payment}
            color="primary"
            onClick={() => {
              inc(1)
              saveDelpay({ delivery, payment })
            }}
            variant="outlined"
          >
            Continue
          </Button>
        </div>
      </Paper>
    </Fragment>
  )
}

export default connect(null, { saveDelpay })(withRouter(DeliveryPayment))
