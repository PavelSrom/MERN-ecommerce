import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userPurchase, guestPurchase } from '../../store/actions/user'
import {
  IconButton,
  Tooltip,
  Paper,
  makeStyles,
  Typography,
  Button,
  Divider,
  CircularProgress
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Subheadline } from '../../utils/Responsive'

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 576,
    padding: 16,
    display: 'block',
    margin: '0 auto'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  payBtn: {
    marginTop: theme.spacing(2)
  }
}))

const Summary = ({
  history,
  inc,
  isAuthenticated,
  user,
  guest,
  delpay,
  loading,
  userPurchase,
  guestPurchase
}) => {
  const handlePayment = () => {
    return isAuthenticated
      ? userPurchase(history)
      : guestPurchase(guest.cart, history)
  }

  const renderItems = who => {
    if (who.cart.length == 0)
      return (
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          No items
        </Typography>
      )

    return who.cart.map(item => (
      <div key={item._id} className={classes.row}>
        <Typography
          key={item._id}
          variant="body1"
          style={{ fontWeight: 'bold' }}
        >
          {item.quantity}x {item.name}
        </Typography>
        <Typography variant="body1">
          {item.price.toLocaleString()} / pcs
        </Typography>
      </div>
    ))
  }

  const renderTotalPrice = who => {
    const total = who.cart
      .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
      .toLocaleString()

    return `${total} CZK`
  }

  const classes = useStyles()

  return (
    <Fragment>
      <Tooltip title="Go back" placement="top">
        <IconButton onClick={() => (isAuthenticated ? inc(0) : inc(1))}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Paper className={classes.paper}>
        <Subheadline center gutterBottom>
          Order summary
        </Subheadline>

        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            First name
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.firstName : guest.info.firstName}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Last name
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.lastName : guest.info.lastName}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Email
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.email : guest.info.email}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Phone
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.phone : guest.info.phone}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Street
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.address.street : guest.info.address.street}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Postal code
          </Typography>
          <Typography variant="body1">
            {isAuthenticated
              ? user.address.postalCode
              : guest.info.address.postalCode}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            City
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.address.city : guest.info.address.city}
          </Typography>
        </div>
        <Divider />
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Delivery
          </Typography>
          <Typography variant="body1">{delpay.delivery}</Typography>
        </div>
        <div className={classes.row} style={{ marginBottom: 32 }}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Payment
          </Typography>
          <Typography variant="body1">{delpay.payment}</Typography>
        </div>

        <Subheadline center gutterBottom>
          Ordered items
        </Subheadline>
        {isAuthenticated ? renderItems(user) : renderItems(guest)}

        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <Subheadline bold>
            Total price:{' '}
            {isAuthenticated ? renderTotalPrice(user) : renderTotalPrice(guest)}
          </Subheadline>

          <Button
            disabled={loading}
            onClick={handlePayment}
            className={classes.payBtn}
            variant="contained"
            color="primary"
          >
            Finish order
          </Button>
        </div>
        {loading && (
          <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
        )}
      </Paper>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
  guest: state.user.guest,
  delpay: state.user.delpay,
  loading: state.visual.loading
})

export default connect(mapStateToProps, { userPurchase, guestPurchase })(
  withRouter(Summary)
)
