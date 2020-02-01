import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToGuestCart, addToUserCart } from '../store/actions/user'
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  IconButton
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: 200,
    display: 'block',
    margin: '0 auto'
  },
  divImg: {
    height: 200,
    marginBottom: theme.spacing(4)
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  flex: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

const ProductCard = ({
  product: { _id, name, imgSrc, specs, price },
  isAuthenticated,
  addToGuestCart,
  addToUserCart,
  user,
  guest
}) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper className={classes.paper}>
        <Link to={`/products/${_id}`}>
          <div className={classes.divImg}>
            <img src={`/images/${imgSrc}`} alt="" className={classes.img} />
          </div>
        </Link>
        <Link to={`/products/${_id}`}>
          <Typography variant="body1" className={classes.name}>
            {name}
          </Typography>
        </Link>

        <div style={{ textAlign: 'center' }}>
          {Object.keys(specs).map(spec => (
            <Typography variant="body2" key={spec}>
              {specs[spec]}
            </Typography>
          ))}
        </div>

        <div className={classes.flex}>
          <Typography variant="h5">{price.toLocaleString()} CZK</Typography>
          {user && isAuthenticated ? (
            <IconButton
              disabled={user.cart.some(item => item.productId === _id)}
              onClick={() => addToUserCart(_id)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              disabled={guest.cart.some(item => item._id === _id)}
              onClick={() => addToGuestCart(_id)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
        </div>
      </Paper>
    </Grid>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
  guest: state.user.guest
})

export default connect(mapStateToProps, { addToGuestCart, addToUserCart })(
  ProductCard
)
