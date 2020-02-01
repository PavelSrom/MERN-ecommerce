import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserProfile } from '../store/actions/user'
import { ResponsiveContainer, Headline, Subheadline } from '../utils/Responsive'
import { Divider, makeStyles, Button } from '@material-ui/core'
import CartItem from '../components/CartItem'
import SadEmojiIcon from '@material-ui/icons/SentimentDissatisfied'

const useStyles = makeStyles(theme => ({
  headline: {
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  emoji: {
    width: 256,
    height: 256,
    color: '#333'
  },
  centered: {
    textAlign: 'center'
  },
  divider: {
    margin: theme.spacing(3)
  }
}))

const Cart = ({ isAuthenticated, user, guest, getUserProfile }) => {
  useEffect(() => {
    if (isAuthenticated) getUserProfile()
  }, [])

  const calculateTotal = arr => {
    return arr
      .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
      .toLocaleString()
  }

  const calculateSum = arr =>
    arr.reduce((acc, { quantity }) => acc + quantity, 0)

  const userCartPresent =
    isAuthenticated && user !== null && user.cart.length > 0
  const guestCartPresent = guest.cart.length > 0

  const classes = useStyles()

  return (
    <section style={{ background: '#f8f8f8', minHeight: 'calc(100vh - 60px)' }}>
      <ResponsiveContainer>
        <Headline className={classes.headline}>
          Your cart{' '}
          {isAuthenticated && user !== null && user.cart.length > 0
            ? `(${calculateSum(user.cart)})`
            : !isAuthenticated && guest.cart.length > 0
            ? `(${calculateSum(guest.cart)})`
            : null}
        </Headline>
        {!isAuthenticated && guest.cart.length == 0 && (
          <div className={classes.centered}>
            <SadEmojiIcon className={classes.emoji} />
            <Subheadline>You have no cart items</Subheadline>
          </div>
        )}
        {!isAuthenticated &&
          guest.cart.map(item => <CartItem key={item._id} item={item} />)}
        {isAuthenticated && user !== null && user.cart.length == 0 && (
          <div className={classes.centered}>
            <SadEmojiIcon className={classes.emoji} />
            <Subheadline>You have no cart items</Subheadline>
          </div>
        )}
        {isAuthenticated &&
          user !== null &&
          user.cart.map(item => (
            <CartItem key={item._id} item={item} quantity={item.quantity} />
          ))}

        {(userCartPresent || guestCartPresent) && (
          <div className={classes.centered}>
            <Divider className={classes.divider} />
            <Subheadline gutterBottom>
              Total price:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {isAuthenticated && user !== null
                  ? calculateTotal(user.cart)
                  : calculateTotal(guest.cart)}{' '}
                CZK
              </span>
            </Subheadline>
            <Button
              component={Link}
              to="/checkout"
              color="primary"
              variant="contained"
            >
              Proceed to checkout
            </Button>
          </div>
        )}
      </ResponsiveContainer>
    </section>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
  guest: state.user.guest
})

export default connect(mapStateToProps, {
  getUserProfile
})(Cart)
