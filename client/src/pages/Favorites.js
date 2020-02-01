import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeFromUserFavorites } from '../store/actions/user'
import { ResponsiveContainer } from '../utils/Responsive'
import {
  Paper,
  makeStyles,
  Tooltip,
  IconButton,
  Typography,
  Grid
} from '@material-ui/core'
import { Headline, Subheadline } from '../utils/Responsive'
import DeleteIcon from '@material-ui/icons/Delete'
import SadEmojiIcon from '@material-ui/icons/SentimentDissatisfied'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto'
  },
  image: {
    maxWidth: 100,
    maxHeight: 100
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
  priceTag: {
    textAlign: 'center'
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  emoji: {
    width: 256,
    height: 256,
    color: '#333'
  },
  headline: {
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Favorites = ({ user: { favorites }, removeFromUserFavorites }) => {
  const classes = useStyles()

  return (
    <section style={{ background: '#f8f8f8', minHeight: 'calc(100vh - 60px)' }}>
      <ResponsiveContainer>
        <div className={classes.centered}>
          {favorites.length > 0 ? (
            <Fragment>
              <Headline className={classes.headline}>
                Your favorite items ({favorites.length})
              </Headline>
              {favorites.map(({ productId, name, imgSrc, price }) => (
                <Paper key={productId} className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={2} className={classes.gridItem}>
                      <Link to={`/products/${productId}`}>
                        <div className={classes.img}>
                          <img
                            className={classes.image}
                            src={`/images/${imgSrc}`}
                            alt=""
                          />
                        </div>
                      </Link>
                    </Grid>

                    <Grid item xs={12} md={8} className={classes.gridItem}>
                      <div>
                        <Link
                          to={`/products/${productId}`}
                          className={classes.link}
                        >
                          <Subheadline variant="h5">{name}</Subheadline>
                        </Link>
                        <Typography
                          variant="body1"
                          className={classes.priceTag}
                        >
                          {price.toLocaleString()} / pcs
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={2} className={classes.gridItem}>
                      <Tooltip placement="top" title="Delete from favorites">
                        <IconButton
                          onClick={() => removeFromUserFavorites(productId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              <Subheadline>You have no favorite items</Subheadline>
              <SadEmojiIcon className={classes.emoji} />
            </Fragment>
          )}
        </div>
      </ResponsiveContainer>
    </section>
  )
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps, {
  removeFromUserFavorites
})(Favorites)
